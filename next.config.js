/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.supermouth.com' },
      { protocol: 'https', hostname: 'supermouthcdn.blob.core.windows.net' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'pics.io' },
      { protocol: 'https', hostname: 'cdn.mos.cms.futurecdn.net' },
      { protocol: 'https', hostname: 'img.huffingtonpost.com' },
      { protocol: 'https', hostname: 'camillestyles.com' },
    ],
  },
}

module.exports = nextConfig
