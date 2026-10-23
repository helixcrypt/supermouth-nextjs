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
      { source: '/collections/:collection/products/:product', destination: '/products/:product', permanent: true },
      { source: '/pages/systems', destination: '/systems-overview', permanent: false },
      { source: '/pages/:slug(supermouth-quiz|assessment)', destination: '/assessment', permanent: false },
      { source: '/pages/:slug((?!systems$|supermouth-quiz$|assessment$).*)', destination: '/:slug', permanent: false },
    ]
  },
}

module.exports = nextConfig
