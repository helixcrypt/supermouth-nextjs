import json, sys

BASE = '/Users/gregorypatterson/Desktop/supermouth-nextjs'
products = json.load(open(f'{BASE}/import_ready.json'))

start = int(sys.argv[1]) if len(sys.argv) > 1 else 0
end = int(sys.argv[2]) if len(sys.argv) > 2 else len(products)
batch = products[start:end]

HEADLESS_PUB = 'gid://shopify/Publication/206810677473'
LOCATION_ID = 'gid://shopify/Location/92941877473'

for i, p in enumerate(batch):
    idx = start + i
    
    # Build options input
    if p['options'] and p['options'] != ['Title']:
        opts_input = ', '.join([f'{{name: "{o}"}}' for o in p['options']])
        opts_str = f'productOptions: [{opts_input}]'
    else:
        opts_str = ''
    
    # Build variants - map option values properly
    var_lines = []
    for v in p['variants']:
        price = v['price']
        compare = f', compareAtPrice: "{v["compareAtPrice"]}"' if v.get('compareAtPrice') else ''
        
        if v['optionValues'] and v['optionValues'][0]['name'] != 'Default Title':
            opt_vals = ', '.join([
                f'{{name: "{ov["name"].replace(chr(39), "")}", optionName: "{ov["optionName"].replace(chr(39), "")}"}}' 
                for ov in v['optionValues']
            ])
            opt_str = f', optionValues: [{opt_vals}]'
        else:
            opt_str = ''
        
        var_lines.append(f'{{price: "{price}"{compare}{opt_str}, inventoryItem: {{tracked: true}}}}')
    
    vars_str = ', '.join(var_lines)
    
    # Build images
    img_lines = []
    for img in p['images'][:5]:
        url = img['url'].replace('"', '')
        alt = img['altText'].replace('"', '').replace("'", '')[:100]
        img_lines.append(f'{{url: "{url}", altText: "{alt}"}}')
    imgs_str = ', '.join(img_lines)
    
    # Build tags
    tags_str = ', '.join([f'"{t}"' for t in p['tags'][:20]])
    
    title = p['title'].replace('"', "'").replace('\\', '')
    handle = p['handle']
    desc = p['descriptionHtml'].replace('"', "'").replace('\\', '').replace('\n', ' ')[:1000]
    vendor = 'SuperMouth'
    
    mutation = f'''mutation {{
  productCreate(input: {{
    title: "{title}"
    handle: "{handle}"
    descriptionHtml: "{desc}"
    vendor: "{vendor}"
    status: ACTIVE
    tags: [{tags_str}]
    {opts_str}
    variants: [{vars_str}]
  }}) {{
    product {{
      id
      title
      handle
      variants(first: 3) {{ edges {{ node {{ id title price {{ amount }} }} }} }}
    }}
    userErrors {{ field message }}
  }}
}}'''
    
    print(f'=== PRODUCT {idx+1}: {title[:50]} ===')
    print(mutation)
    print()

print(f'--- IMAGES for batch {start}-{end} ---')
for i, p in enumerate(batch):
    idx = start + i
    if p['images']:
        print(f'PRODUCT_IDX:{idx}:IMAGES:{json.dumps([img["url"] for img in p["images"][:5]])}')
