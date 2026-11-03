"""Build lib/routine/catalog.json from the Emma data package (Q1_products_sellable.csv).
Usage: python3 scripts/build_routine_catalog.py <path to Q1_products_sellable.csv>"""
import csv, json, sys
from collections import Counter

src = sys.argv[1]
rows = list(csv.DictReader(open(src, encoding='utf-8-sig')))


def bracket(a):
    a = a.lower()
    if 'baby' in a: return 'B'
    if 'little' in a: return 'L'
    if 'big' in a: return 'K'
    if 'pregnancy' in a: return 'P'
    return 'A'


systems = []
for x in rows:
    if x['is_system'] != 'yes':
        continue
    t = x['product_title']
    formula = 'O' if 'Ortho' in t else ('F' if x['fluoride'] == 'Fluoride' else 'N')
    opts = dict(p.split(': ', 1) for p in x['options'].split('; ') if ': ' in p)
    systems.append(dict(
        bracket=bracket(x['age_stages']), formula=formula, tier=x['system_tier'] or 'Complete',
        flavor=x['flavor'], floss=opts.get('Floss Type', ''), title=t, handle=x['product_handle'],
        gid=x['test_store_variant_gid'], price=float(x['price_usd_reference'] or 0),
    ))

ADDONS = {
    'OrthoBrush Manual Toothbrush for Braces': 'ortho_brush',
    'Ortho Mouth Spray for Braces and Aligners': 'ortho_spray',
    'SuperMouth Nano-Hydroxyapatite with Fluoride Floss \u2013 Ortho Floss': 'ortho_floss',
}
addons = []
for x in rows:
    k = ADDONS.get(x['product_title'])
    if k:
        addons.append(dict(key=k, title=x['product_title'], variant=x['variant_title'], flavor=x['flavor'],
                           handle=x['product_handle'], gid=x['test_store_variant_gid'],
                           price=float(x['price_usd_reference'] or 0), fluoride=x['fluoride']))

json.dump(dict(systems=systems, addons=addons), open('lib/routine/catalog.json', 'w'), indent=1, ensure_ascii=False)
print(len(systems), 'systems;', len(addons), 'add-on variants')
print(Counter((s['bracket'], s['formula'], s['tier']) for s in systems))
print(Counter(a['key'] for a in addons))
