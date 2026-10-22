import json, sys
BASE = '/Users/gregorypatterson/Desktop/supermouth-nextjs'
products = json.load(open(f'{BASE}/import_ready.json'))
idx = int(sys.argv[1])
p = products[idx]
print(json.dumps(p))
