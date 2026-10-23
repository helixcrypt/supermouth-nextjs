/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 0,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'pics.io' },
    ],
  },
  // Old supermouth.com / Shopify-style paths that appear in copied content
  async redirects() {
    return [
      { source: '/account', destination: 'https://newsupermouth.myshopify.com/account', permanent: false },
      { source: '/collections/ortho-systems', destination: '/systems/orthodontics', permanent: false },
      { source: '/collections/supermouth-systems', destination: '/systems/2-to-5', permanent: false },
      { source: '/collections/supermouth-systems-ages-6-to-12', destination: '/systems/6-to-12', permanent: false },
      { source: '/collections/supermouth-systems-ages-13-and-up', destination: '/systems/teens-and-adults', permanent: false },
      { source: '/collections/supermouth-systems-during-pregnancy', destination: '/systems/pregnancy', permanent: false },
      { source: '/collections/supermouth-systems-for-ages-teething-to-24-months', destination: '/systems/teething-to-24-months', permanent: false },
      { source: '/collections/:collection/products/:product', destination: '/products/:product', permanent: true },
      { source: '/pages/systems', destination: '/systems-overview', permanent: false },
      { source: '/pages/:slug(supermouth-quiz|assessment)', destination: '/assessment', permanent: false },
      { source: '/pages/:slug((?!systems$|supermouth-quiz$|assessment$).*)', destination: '/:slug', permanent: false },
    ]
  },
}

module.exports = nextConfig
