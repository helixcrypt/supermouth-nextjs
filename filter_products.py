import json, re

BASE = '/Users/gregorypatterson/Desktop/supermouth-nextjs'
all_products = json.load(open(f'{BASE}/real_products.json'))

# Filter to consumer-facing products only
# Exclude: internal tools (comic books, brochures, stickers, bags, boxes, letters, certificates, posters, etc.)
EXCLUDE_KEYWORDS = [
    'comic book', 'brochure', 'sticker', 'bag', 'system box', 'packaging',
    'guide', 'tri fold', 'trifold', 'bookmark', 'letter', 'certificate',
    'booklet', 'magazine', 'neck label', 'poster', 'marketing tool',
    'display box', 'tear pad', 'owners box', 'sample pouch', 'riser',
    'manual system', 'kit item', 'membership level', 'add-on level',
    'superbucks', 'gift card', 'ar sticker', 'flavor sticker',
    'science brochure', 'business brochure', 'special instruction',
    'promo dental floss'
]

EXCLUDE_TYPES = ['kit item', 'kit-item']

consumer_products = []
skipped = []

for edge in all_products:
    p = edge['node']
    title_lower = p['title'].lower()
    handle_lower = p['handle'].lower()

    # Skip internal/wholesale products
    skip = False
    for kw in EXCLUDE_KEYWORDS:
        if kw in title_lower or kw in handle_lower:
            skip = True
            break

    if '-kit-item' in handle_lower or 'kit-item' in handle_lower:
        skip = True

    # Skip products with no images (usually internal)
    if not p['images']['edges']:
        skip = True

    # Skip unavailable
    if not p['availableForSale']:
        skip = True

    if skip:
        skipped.append(p['title'])
    else:
        consumer_products.append(p)

print(f'Consumer products: {len(consumer_products)}')
print(f'Skipped: {len(skipped)}')
print()
print('=== CONSUMER PRODUCTS ===')
for p in consumer_products:
    variants = p['variants']['edges']
    images = p['images']['edges']
    options = [o['name'] for o in p.get('options', [])]
    var_examples = [v['node']['title'] for v in variants[:3]]
    print(f"  {p['title'][:55]:<55} {len(variants)}var {len(images)}img {options} eg:{var_examples}")

print()
print('=== SKIPPED ===')
for t in skipped:
    print(f'  {t}')

with open(f'{BASE}/consumer_products.json', 'w') as f:
    json.dump(consumer_products, f, indent=2)
print(f'\nSaved {len(consumer_products)} consumer products')
