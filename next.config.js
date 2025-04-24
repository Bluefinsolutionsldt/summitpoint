module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.summitpoint.co.tz',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'summitpoint.co.tz',
        pathname: '/**',
      },
    ],
  },
}; 