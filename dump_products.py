import json
BASE = '/Users/gregorypatterson/Desktop/supermouth-nextjs'
products = json.load(open(f'{BASE}/import_ready.json'))
# Output compact JSON per product for easy consumption
for i, p in enumerate(products):
    compact = {
        'i': i,
        'title': p['title'],
        'handle': p['handle'],
        'options': p['options'],
        'tags': p['tags'][:8],
        'variants': p['variants'][:50],
        'images': p['images'][:5],
        'desc': p['descriptionHtml'][:300],
        'vendor': 'SuperMouth',
        'status': 'ACTIVE'
    }
    print(json.dumps(compact))
