const nextConfig = {
  // Redirect velut.co.uk to www.velut.co.uk
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'velut.co.uk' }],
      destination: 'https://www.velut.co.uk/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'velut.info' }],
      destination: 'https://www.velut.info/:path*',
      permanent: true,
    },
  ],
  devIndicators: false,
  serverExternalPackages: ['pino', 'pino-pretty'],
}

module.exports = nextConfig
