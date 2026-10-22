#!/usr/bin/env python3
"""
Import all SuperMouth products via Shopify REST API.
REST API supports creating products with variants in one call.
"""
import json, urllib.request, urllib.error, time, sys, os

BASE = '/Users/gregorypatterson/Desktop/supermouth-nextjs'
DOMAIN = 'fn75n7-94.myshopify.com'
HEADLESS_PUB_ID = '206810677473'
LOCATION_ID = '92941877473'

# We need the Admin API token - check if we saved it
TOKEN_FILE = f'{BASE}/.shopify_admin_token'

# Try to get token from environment or file
TOKEN = os.environ.get('SHOPIFY_ADMIN_TOKEN', '')
if not TOKEN and os.path.exists(TOKEN_FILE):
    TOKEN = open(TOKEN_FILE).read().strip()

if not TOKEN:
    print('ERROR: Need Shopify Admin API token.')
    print('Please create a custom app in Shopify admin and paste the token:')
    print('Settings -> Apps -> Develop apps -> Create app -> Configure Admin API -> Install')
    print(f'Then save it: echo "shpat_YOUR_TOKEN" > {TOKEN_FILE}')
    sys.exit(1)

ADMIN_URL = f'https://{DOMAIN}/admin/api/2024-04'

def rest_call(method, path, data=None):
    url = f'{ADMIN_URL}{path}'
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, method=method,
        headers={
            'X-Shopify-Access-Token': TOKEN,
            'Content-Type': 'application/json',
        })
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.load(r), r.status
    except urllib.error.HTTPError as e:
        return json.loads(e.read()), e.code

# Load products
products = json.load(open(f'{BASE}/import_ready.json'))

# Load progress
progress_file = f'{BASE}/import_progress.json'
done = json.load(open(progress_file)) if os.path.exists(progress_file) else {}

start = int(sys.argv[1]) if len(sys.argv) > 1 else 0
end = int(sys.argv[2]) if len(sys.argv) > 2 else len(products)

print(f'Importing products {start}-{end} of {len(products)}')

for i in range(start, end):
    p = products[i]
    handle = p['handle']
    
    if handle in done:
        print(f'[{i+1}] SKIP (already done): {p["title"][:50]}')
        continue
    
    # Build REST product payload
    options = p['options']
    has_real_options = options and options != ['Title'] and options[0] != 'Title'
    
    variants_payload = []
    for v in p['variants'][:100]:
        var = {
            'price': v['price'],
            'inventory_management': 'shopify',
            'inventory_quantity': 100,
        }
        if v.get('compareAtPrice'):
            var['compare_at_price'] = v['compareAtPrice']
        
        if has_real_options and v.get('optionValues'):
            for j, ov in enumerate(v['optionValues'][:3]):
                var[f'option{j+1}'] = ov['name']
        
        variants_payload.append(var)
    
    images_payload = [{'src': img['url'], 'alt': img.get('altText', '')[:255]} 
                      for img in p['images'][:5] if img.get('url')]
    
    product_payload = {
        'product': {
            'title': p['title'],
            'handle': handle,
            'body_html': p['descriptionHtml'][:3000],
            'vendor': 'SuperMouth',
            'status': 'active',
            'tags': ', '.join(p['tags'][:20]),
            'variants': variants_payload,
            'images': images_payload,
        }
    }
    
    if has_real_options:
        product_payload['product']['options'] = options[:3]
    
    result, status = rest_call('POST', '/products.json', product_payload)
    
    if status == 201:
        product_id = result['product']['id']
        var_count = len(result['product']['variants'])
        img_count = len(result['product']['images'])
        
        # Publish to headless channel
        pub_result, pub_status = rest_call('PUT', 
            f'/products/{product_id}/publications.json',
            {'publication': {'publication_id': int(HEADLESS_PUB_ID)}})
        
        done[handle] = {'id': product_id, 'title': p['title']}
        print(f'[{i+1}] OK  {p["title"][:55]:<55} {var_count}var {img_count}img id:{product_id}')
    else:
        errors = result.get('errors', result)
        print(f'[{i+1}] ERR {p["title"][:50]}: {errors}')
        done[handle] = {'error': str(errors)}
    
    # Save progress
    with open(progress_file, 'w') as f:
        json.dump(done, f, indent=2)
    
    time.sleep(0.5)  # Rate limit: 2 calls/second

total_ok = sum(1 for v in done.values() if 'id' in v)
print(f'\nDone. Successful: {total_ok}/{len(products)}')
