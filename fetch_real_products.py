import urllib.request, json, time

DOMAIN = 'supermouth.myshopify.com'
URL = f'https://{DOMAIN}/api/2024-04/graphql.json'
TOKEN = '760593b73845dc99c1cf0ee492a21b3f'

def query(q, variables=None):
    body = {'query': q}
    if variables:
        body['variables'] = variables
    req = urllib.request.Request(URL,
        data=json.dumps(body).encode(),
        headers={
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': TOKEN
        })
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

# Fetch ALL products with full variants and images
all_products = []
cursor = None

PRODUCT_QUERY = '''
query GetProducts($cursor: String) {
  products(first: 50, after: $cursor) {
    pageInfo { hasNextPage endCursor }
    edges {
      node {
        id
        title
        handle
        description
        descriptionHtml
        availableForSale
        productType
        tags
        priceRange {
          minVariantPrice { amount }
          maxVariantPrice { amount }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              quantityAvailable
              price { amount }
              compareAtPrice { amount }
              image { url altText }
              selectedOptions { name value }
            }
          }
        }
        options {
          name
          values
        }
      }
    }
  }
}
'''

print('Fetching all products from supermouth.myshopify.com...')
page = 1
while True:
    result = query(PRODUCT_QUERY, {'cursor': cursor})
    products = result['data']['products']
    edges = products['edges']
    all_products.extend(edges)
    print(f'  Page {page}: {len(edges)} products (total: {len(all_products)})')

    if not products['pageInfo']['hasNextPage']:
        break
    cursor = products['pageInfo']['endCursor']
    page += 1
    time.sleep(0.3)

print(f'\nTotal: {len(all_products)} products')

# Save
with open('/Users/gregorypatterson/Desktop/supermouth-nextjs/real_products.json', 'w') as f:
    json.dump(all_products, f, indent=2)

# Print summary
print('\n=== PRODUCT SUMMARY ===')
for p in all_products:
    n = p['node']
    variants = n['variants']['edges']
    images = n['images']['edges']
    options = n.get('options', [])
    opt_names = [o['name'] for o in options]
    var_titles = [v['node']['title'] for v in variants[:4]]
    avail = 'YES' if n['availableForSale'] else 'NO'
    print(f"[{avail}] {n['title'][:45]:<45} {len(variants)}var {len(images)}img opts:{opt_names} eg:{var_titles[:2]}")
