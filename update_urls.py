import os, urllib.request

path = '/Users/gregorypatterson/Desktop/supermouth-nextjs/app/page.tsx'
content = open(path).read()

replacements = {
    'https://cdn.supermouth.com/website/SM-website_get_started_1_guide_you.jpg': '/cdn/get-started-1.jpg',
    'https://cdn.supermouth.com/website/SM-website_get_started_2_shop_systems.jpg': '/cdn/get-started-2.jpg',
    'https://cdn.supermouth.com/website/SM-website_get_started_3_shop_products.jpg': '/cdn/get-started-3.jpg',
    'https://supermouthcdn.blob.core.windows.net/website/shop_by_age_kids_various_products.jpeg': '/cdn/shop-by-age-kids.jpg',
    'https://supermouthcdn.blob.core.windows.net/website/shop_by_age_adults_vanilla_and_ultim8.jpeg': '/cdn/shop-by-age-adults.jpg',
    'https://cdn.supermouth.com/website/0-24_Complete_NFL.png': '/cdn/system-0-24.png',
    'https://cdn.supermouth.com/website/2-5_Complete_NFL.png': '/cdn/system-2-5.png',
    'https://cdn.supermouth.com/website/6-12_Complete_NFL.png': '/cdn/system-6-12.png',
    'https://cdn.supermouth.com/website/teen_adult_complete_nfl.png': '/cdn/system-teens-adults.png',
    'https://cdn.supermouth.com/website/pregnancy_complete_nfl.png': '/cdn/system-pregnancy.png',
    'https://cdn.supermouth.com/website/Ortho_Basic_Mint_Hydroxamin.jpg': '/cdn/system-ortho.jpg',
    'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_SAFE.png': '/cdn/super-safe.png',
    'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_UNIFIED.png': '/cdn/super-unified.png',
    'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_PLAYFUL.png': '/cdn/super-playful.png',
    'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_EFFECTIVE.png': '/cdn/super-effective.png',
    'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_REPUTABLE.png': '/cdn/super-reputable.png',
    'https://cdn.supermouth.com/website/trosm-teaser.jpg': '/cdn/trosm-teaser.jpg',
}

for old, new in replacements.items():
    content = content.replace(old, new)

open(path, 'w').write(content)
print('page.tsx updated')
