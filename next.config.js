/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 0,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.supermouth.com' },
      { protocol: 'https', hostname: 'supermouthcdn.blob.core.windows.net' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'pics.io' },
    ],
  },
}

module.exports = nextConfig
