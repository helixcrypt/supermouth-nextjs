import os, re

dirs = [
    '/Users/gregorypatterson/Desktop/supermouth-nextjs/app',
    '/Users/gregorypatterson/Desktop/supermouth-nextjs/components'
]

pattern = re.compile(r'https://(?:cdn\.supermouth\.com|supermouthcdn\.blob\.core\.windows\.net)/[A-Za-z0-9_./@-]+')
urls = set()

for d in dirs:
    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith(('.tsx', '.ts', '.js')):
                path = os.path.join(root, f)
                text = open(path).read()
                for m in pattern.findall(text):
                    urls.add(m)

for u in sorted(urls):
    print(u)
