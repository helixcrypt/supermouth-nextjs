import json, sys

BASE = '/Users/gregorypatterson/Desktop/supermouth-nextjs'
products = json.load(open(f'{BASE}/import_ready.json'))

start = int(sys.argv[1]) if len(sys.argv) > 1 else 0
end = int(sys.argv[2]) if len(sys.argv) > 2 else start + 5

batch = products[start:end]

def escape(s):
    if not s:
        return ''
    return s.replace('\\', '').replace('"', "'").replace('\n', ' ').replace('\r', '')

def build_mutation(p, alias):
    title = escape(p['title'])
    handle = p['handle']
    desc = escape(p['descriptionHtml'][:500])
    tags = ', '.join([f'"{t}"' for t in p['tags'][:10]])
    
    # Options
    opts = p['options']
    if opts and opts != ['Title'] and opts[0] != 'Title':
        opts_gql = 'productOptions: [' + ', '.join([f'{{name: "{o}"}}' for o in opts]) + ']'
    else:
        opts_gql = ''
    
    # Variants
    var_parts = []
    for v in p['variants'][:50]:
        price = v['price']
        opt_vals = v.get('optionValues', [])
        if opt_vals and opt_vals[0]['name'] != 'Default Title':
            ov_gql = '[' + ', '.join([
                f'{{name: "{escape(ov["name"])}", optionName: "{escape(ov["optionName"])}"}}'
                for ov in opt_vals
            ]) + ']'
            var_parts.append(f'{{price: "{price}", optionValues: {ov_gql}, inventoryItem: {{tracked: true}}}}')
        else:
            var_parts.append(f'{{price: "{price}", inventoryItem: {{tracked: true}}}}')
    
    vars_gql = ', '.join(var_parts)
    
    # Images
    img_parts = []
    for img in p['images'][:3]:
        url = img['url'].replace('"', '')
        alt = escape(img.get('altText', title))[:80]
        img_parts.append(f'{{url: "{url}", altText: "{alt}"}}')
    imgs_gql = ', '.join(img_parts)
    
    mutation = f'''
  {alias}: productCreate(input: {{
    title: "{title}"
    handle: "{handle}"
    descriptionHtml: "{desc}"
    vendor: "SuperMouth"
    status: ACTIVE
    tags: [{tags}]
    {opts_gql}
    variants: [{vars_gql}]
  }}) {{
    product {{ id title handle }}
    userErrors {{ field message }}
  }}'''
    
    return mutation, imgs_gql

mutations = []
image_data = {}

for i, p in enumerate(batch):
    alias = f'p{start + i}'
    mut, imgs = build_mutation(p, alias)
    mutations.append(mut)
    if imgs:
        image_data[alias] = (f'PRODUCT_IDX_{start + i}', imgs)

full_mutation = 'mutation {' + ''.join(mutations) + '\n}'
print(full_mutation)
print()
print('IMAGE_DATA:', json.dumps(image_data))
