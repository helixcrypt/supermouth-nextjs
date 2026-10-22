import urllib.request, json, subprocess, re, time

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}

# Test with a few key products that should have variants
test_urls = [
    'https://supermouth.com/products/supermouth-hydroxamin-w-fluoride-toothpaste-3-4-oz',
    'https://supermouth.com/products/supermouth-mouthwash-w-fluoride',
    'https://supermouth.com/products/turbo-sonic-mouthbrush',
    'https://supermouth.com/products/ultim8-electric-toothbrush',
]

for url in test_urls:
    handle = url.split('/products/')[-1]
    result = subprocess.run(
        ['curl', '-s', '-L', '-A', 'Mozilla/5.0', '--max-time', '15', url],
        capture_output=True, timeout=20
    )
    html = result.stdout.decode('utf-8', errors='replace')

    # Try JSON-LD first
    jsonld_blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
    for blob in jsonld_blocks:
        try:
            data = json.loads(blob.strip())
            items = data if isinstance(data, list) else [data]
            for item in items:
                if item.get('@type') == 'Product':
                    offers = item.get('offers', [])
                    if isinstance(offers, list):
                        print(f'\n{handle}:')
                        print(f'  Name: {item.get("name", "")}')
                        print(f'  Image: {item.get("image", [""])[0] if isinstance(item.get("image"), list) else item.get("image", "")}')
                        print(f'  Variants ({len(offers)}):')
                        for o in offers[:8]:
                            print(f'    - {o.get("name","?")} | ${o.get("price","?")} | {o.get("availability","?")}')
        except:
            pass

    # Also look for Shopify product JSON in page
    shopify_match = re.search(r'var meta = ({.*?"product".*?});', html, re.DOTALL)
    if not shopify_match:
        shopify_match = re.search(r'"product":({[^}]+})', html)

    # Look for product images in img tags
    imgs = re.findall(r'cdn\.supermouth\.com/[A-Za-z0-9_./@-]+\.(?:jpg|jpeg|png|webp)', html)
    imgs = list(dict.fromkeys(imgs))
    if imgs:
        print(f'  CDN images found: {len(imgs)}')
        for img in imgs[:3]:
            print(f'    https://{img}')

    time.sleep(0.5)
