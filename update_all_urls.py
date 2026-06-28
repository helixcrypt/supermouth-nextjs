import os

base = '/Users/gregorypatterson/Desktop/supermouth-nextjs'

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
    'https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_1_400x500.png': '/cdn/our-story-1.png',
    'https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_2_500x300.png': '/cdn/our-story-2.png',
    'https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_3_400x400.png': '/cdn/our-story-3.png',
    'https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_4_400x400.png': '/cdn/our-story-4.png',
    'https://cdn.supermouth.com/website/SuperMouth_Hero_image_our_story.png': '/cdn/hero-our-story.png',
    'https://cdn.supermouth.com/website/Supermouth-full-logo_reversed.png': '/cdn/logo-reversed.png',
    'https://cdn.supermouth.com/images/SM-website_2.0-_shop_products_page-header_image-ni.jpg': '/cdn/header-shop.jpg',
    'https://cdn.supermouth.com/images/SM-website_2.0-_systems_page-header_image-ni.jpg': '/cdn/header-systems.jpg',
    'https://cdn.supermouth.com/images/SM-website_2.0-_subscription_page-header_image-ni.jpg': '/cdn/header-subscription.jpg',
    'https://cdn.supermouth.com/images/auto-adjust.jpg': '/cdn/sub-auto-adjust.jpg',
    'https://cdn.supermouth.com/images/best_value.jpg': '/cdn/sub-best-value.jpg',
    'https://cdn.supermouth.com/images/discount_on_accessories.jpg': '/cdn/sub-discount.jpg',
    'https://cdn.supermouth.com/images/hasstle_free_cancellation.jpg': '/cdn/sub-cancel.jpg',
    'https://cdn.supermouth.com/images/peace_of_mind.jpg': '/cdn/sub-peace.jpg',
    'https://cdn.supermouth.com/images/personal_oral_care_advisor.jpg': '/cdn/sub-advisor.jpg',
    'https://cdn.supermouth.com/videos/SupermouthAnchor_Final_4kWEB.00_02_35_12.Still006.jpg': '/cdn/video-still.jpg',
    'https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners0900.png': '/cdn/banner-0900.png',
    'https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners0968.png': '/cdn/banner-0968.png',
    'https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners1066.png': '/cdn/banner-1066.png',
    'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothbrush.png': '/cdn/category-toothbrush.png',
    'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothpaste.png': '/cdn/category-toothpaste.png',
    'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_mouthwash.png': '/cdn/category-mouthwash.png',
}

changed = []
for root, dirs, files in os.walk(base + '/app'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            path = os.path.join(root, f)
            content = open(path).read()
            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
            if new_content != content:
                open(path, 'w').write(new_content)
                changed.append(path.replace(base, ''))

for root, dirs, files in os.walk(base + '/components'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            path = os.path.join(root, f)
            content = open(path).read()
            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
            if new_content != content:
                open(path, 'w').write(new_content)
                changed.append(path.replace(base, ''))

print(f'Updated {len(changed)} files:')
for f in changed:
    print(f'  {f}')
