import os, urllib.request, urllib.error

dest = '/Users/gregorypatterson/Desktop/supermouth-nextjs/public/cdn'
os.makedirs(dest, exist_ok=True)

images = [
    # website folder
    ('https://cdn.supermouth.com/website/0-24_Complete_NFL.png', 'system-0-24.png'),
    ('https://cdn.supermouth.com/website/2-5_Complete_NFL.png', 'system-2-5.png'),
    ('https://cdn.supermouth.com/website/6-12_Complete_NFL.png', 'system-6-12.png'),
    ('https://cdn.supermouth.com/website/teen_adult_complete_nfl.png', 'system-teens-adults.png'),
    ('https://cdn.supermouth.com/website/pregnancy_complete_nfl.png', 'system-pregnancy.png'),
    ('https://cdn.supermouth.com/website/Ortho_Basic_Mint_Hydroxamin.jpg', 'system-ortho.jpg'),
    ('https://cdn.supermouth.com/website/SuperMouth_Hero_image_kids.png', 'hero-kids.png'),
    ('https://cdn.supermouth.com/website/SuperMouth_Hero_image_pregnancy.png', 'hero-pregnancy.png'),
    ('https://cdn.supermouth.com/website/SuperMouth_Hero_image_teens_adults.png', 'hero-teens.png'),
    ('https://cdn.supermouth.com/website/SuperMouth_Hero_image_ortho.png', 'hero-ortho.png'),
    ('https://cdn.supermouth.com/website/SuperMouth_Hero_image_our_story.png', 'hero-our-story.png'),
    ('https://cdn.supermouth.com/website/S.U.P.E.R_graphic_SAFE.png', 'super-safe.png'),
    ('https://cdn.supermouth.com/website/S.U.P.E.R_graphic_UNIFIED.png', 'super-unified.png'),
    ('https://cdn.supermouth.com/website/S.U.P.E.R_graphic_PLAYFUL.png', 'super-playful.png'),
    ('https://cdn.supermouth.com/website/S.U.P.E.R_graphic_EFFECTIVE.png', 'super-effective.png'),
    ('https://cdn.supermouth.com/website/S.U.P.E.R_graphic_REPUTABLE.png', 'super-reputable.png'),
    ('https://cdn.supermouth.com/website/SM-website_get_started_1_guide_you.jpg', 'get-started-1.jpg'),
    ('https://cdn.supermouth.com/website/SM-website_get_started_2_shop_systems.jpg', 'get-started-2.jpg'),
    ('https://cdn.supermouth.com/website/SM-website_get_started_3_shop_products.jpg', 'get-started-3.jpg'),
    ('https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_1_400x500.png', 'our-story-1.png'),
    ('https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_2_500x300.png', 'our-story-2.png'),
    ('https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_3_400x400.png', 'our-story-3.png'),
    ('https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_4_400x400.png', 'our-story-4.png'),
    ('https://cdn.supermouth.com/website/Supermouth-full-logo_reversed.png', 'logo-reversed.png'),
    ('https://cdn.supermouth.com/website/trosm-teaser.jpg', 'trosm-teaser.jpg'),
    ('https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothbrush.png', 'category-toothbrush.png'),
    ('https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothpaste.png', 'category-toothpaste.png'),
    ('https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_mouthwash.png', 'category-mouthwash.png'),
    # blob storage
    ('https://supermouthcdn.blob.core.windows.net/website/shop_by_age_kids_various_products.jpeg', 'shop-by-age-kids.jpg'),
    ('https://supermouthcdn.blob.core.windows.net/website/shop_by_age_adults_vanilla_and_ultim8.jpeg', 'shop-by-age-adults.jpg'),
    ('https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners0900.png', 'banner-0900.png'),
    ('https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners0968.png', 'banner-0968.png'),
    ('https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners1066.png', 'banner-1066.png'),
    # images folder
    ('https://cdn.supermouth.com/images/SM-website_2.0-_shop_products_page-header_image-ni.jpg', 'header-shop.jpg'),
    ('https://cdn.supermouth.com/images/SM-website_2.0-_systems_page-header_image-ni.jpg', 'header-systems.jpg'),
    ('https://cdn.supermouth.com/images/SM-website_2.0-_subscription_page-header_image-ni.jpg', 'header-subscription.jpg'),
    ('https://cdn.supermouth.com/images/auto-adjust.jpg', 'sub-auto-adjust.jpg'),
    ('https://cdn.supermouth.com/images/best_value.jpg', 'sub-best-value.jpg'),
    ('https://cdn.supermouth.com/images/discount_on_accessories.jpg', 'sub-discount.jpg'),
    ('https://cdn.supermouth.com/images/hasstle_free_cancellation.jpg', 'sub-cancel.jpg'),
    ('https://cdn.supermouth.com/images/peace_of_mind.jpg', 'sub-peace.jpg'),
    ('https://cdn.supermouth.com/images/personal_oral_care_advisor.jpg', 'sub-advisor.jpg'),
    # video still
    ('https://cdn.supermouth.com/videos/SupermouthAnchor_Final_4kWEB.00_02_35_12.Still006.jpg', 'video-still.jpg'),
]

headers = {'User-Agent': 'Mozilla/5.0'}

for url, filename in images:
    filepath = os.path.join(dest, filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as r:
            data = r.read()
        if len(data) < 500:
            print(f'SKIP (too small): {filename} ({len(data)} bytes)')
            continue
        with open(filepath, 'wb') as f:
            f.write(data)
        print(f'OK  {filename} ({len(data):,} bytes)')
    except Exception as e:
        print(f'FAIL {filename}: {e}')
