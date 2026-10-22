import json, urllib.request, time, html, re

BASE = '/Users/gregorypatterson/Desktop/supermouth-nextjs'
DOMAIN = 'fn75n7-94.myshopify.com'
# Use Claude Connector's session - we'll call via the storefront token approach
# But for Admin mutations we need to use the MCP - so instead output mutations for each product
products = json.load(open(f'{BASE}/consumer_products.json'))

HEADLESS_PUB = 'gid://shopify/Publication/206810677473'
LOCATION_ID = 'gid://shopify/Location/92941877473'

def clean(s):
    if not s:
        return ''
    s = html.unescape(s)
    s = s.replace('Hydroxamin\u2122', 'Nano-Hydroxyapatite')
    s = s.replace('\u2122', '')
    s = s.replace('\u00ae', '')
    s = s.replace('\u2014', '-')
    s = s.replace('\u2013', '-')
    s = s.replace('\u2019', "'")
    s = s.replace('\u201c', '"')
    s = s.replace('\u201d', '"')
    return s.strip()

def get_tags(p):
    tags = list(p.get('tags', []))
    title_lower = p['title'].lower()
    handle_lower = p['handle'].lower()
    
    if any(x in title_lower for x in ['kids', 'toddler', 'baby', 'bristles baby', 'teether', 'finger brush', '0 to 24', 'teething']):
        tags += ['kids', 'baby']
    if any(x in title_lower for x in ['teen', 'adult', 'ultim8', 'superbrush manual']):
        tags += ['adults', 'teens']
    if any(x in title_lower for x in ['ortho', 'braces', 'aligner', 'orthodontic']):
        tags += ['ortho', 'braces']
    if any(x in title_lower for x in ['pregnan']):
        tags += ['pregnancy']
    if any(x in title_lower for x in ['bundle']):
        tags += ['bundle']
    if any(x in title_lower for x in ['system', 'ages', 'teething to']):
        tags += ['system']
    if any(x in title_lower for x in ['membership']):
        tags += ['membership', 'subscription']
    return list(set(tags))

# Build import data for each product
import_data = []
for p in products:
    title = clean(p['title'])
    handle = p['handle']
    desc = clean(p.get('descriptionHtml', p.get('description', '')))
    
    # Get images (real CDN URLs)
    images = [{'url': img['node']['url'], 'altText': clean(img['node'].get('altText', '') or title)}
              for img in p['images']['edges']]
    
    # Get options
    options = p.get('options', [])
    option_names = [o['name'] for o in options]
    
    # Get variants
    variants = []
    for ve in p['variants']['edges']:
        v = ve['node']
        var_title = clean(v['title'])
        price = v['price']['amount']
        compare_price = v.get('compareAtPrice', {})
        compare = compare_price.get('amount') if compare_price else None
        opts = v.get('selectedOptions', [])
        var_img = v.get('image', {})
        
        variant_data = {
            'title': var_title,
            'price': price,
            'compareAtPrice': compare,
            'optionValues': [{'name': o['value'], 'optionName': o['name']} for o in opts],
            'inventoryItem': {'tracked': True},
        }
        variants.append(variant_data)
    
    tags = get_tags(p)
    
    import_data.append({
        'title': title,
        'handle': handle,
        'descriptionHtml': desc[:3000] if desc else f'<p>{title} by SuperMouth.</p>',
        'vendor': 'SuperMouth',
        'tags': tags,
        'status': 'ACTIVE',
        'images': images[:5],
        'options': option_names if len(option_names) > 1 or (option_names and option_names[0] != 'Title') else ['Title'],
        'variants': variants[:50],
    })

with open(f'{BASE}/import_ready.json', 'w', encoding='utf-8') as f:
    json.dump(import_data, f, indent=2, ensure_ascii=False)

print(f'Ready to import: {len(import_data)} products')
for p in import_data[:5]:
    print(f"  {p['title'][:50]} | {len(p['variants'])}var | {len(p['images'])}img | tags:{p['tags'][:3]}")
