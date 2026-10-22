import urllib.request, json

# Try the real supermouth store's Storefront API
# Many stores have a public storefront token we can find
DOMAIN = 'supermouth.myshopify.com'

# Try with no token first - some stores allow public access
query = '{ shop { name } products(first: 3) { edges { node { title variants(first: 3) { edges { node { title price { amount } } } } } } } }'

for token in ['', 'null']:
    headers = {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token
    }
    if not token:
        headers = {'Content-Type': 'application/json'}

    try:
        req = urllib.request.Request(
            f'https://{DOMAIN}/api/2024-04/graphql.json',
            data=json.dumps({'query': query}).encode(),
            headers=headers
        )
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.load(r)
            print(f'Token "{token}": SUCCESS')
            print(json.dumps(data, indent=2)[:500])
    except Exception as e:
        print(f'Token "{token}": {e}')

# Also check if there's a token in the page source
import subprocess, re
result = subprocess.run(
    ['curl', '-s', '-L', '-A', 'Mozilla/5.0', 'https://supermouth.com'],
    capture_output=True, timeout=20
)
html = result.stdout.decode('utf-8', errors='replace')

# Look for storefront tokens in JS
tokens = re.findall(r'["\']([0-9a-f]{32})["\']', html)
print(f'\n32-char hex tokens in page: {tokens[:10]}')

# Look for storefront access
for pattern in ['storefrontAccessToken', 'STOREFRONT_TOKEN', 'publicStorefrontToken', 'storefront_token']:
    idx = html.find(pattern)
    if idx > 0:
        print(f'Found {pattern}: {html[idx:idx+80]}')
