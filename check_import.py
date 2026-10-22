import json
BASE = '/Users/gregorypatterson/Desktop/supermouth-nextjs'
products = json.load(open(f'{BASE}/import_ready.json'))
print(f'Loaded {len(products)} products')
# Show first product structure
p = products[0]
print(f"Title: {p['title']}")
print(f"Handle: {p['handle']}")
print(f"Options: {p['options']}")
print(f"Variants ({len(p['variants'])}):")
for v in p['variants'][:3]:
    print(f"  {v['title']} ${v['price']} opts:{v['optionValues']}")
print(f"Images ({len(p['images'])}):")
for img in p['images'][:2]:
    print(f"  {img['url'][:80]}")
