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
      { source: '/pages/systems', destination: '/systems-overview', permanent: true },
      { source: '/pages/supermouth-quiz', destination: '/assessment', permanent: true },
      { source: '/pages/assessment', destination: '/assessment', permanent: true },
      { source: '/collections/:collection/products/:product', destination: '/products/:product', permanent: true },
      { source: '/pages/:slug', destination: '/:slug', permanent: true },
    ]
  },
}

module.exports = nextConfig
