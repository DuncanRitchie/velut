const nextConfig = {
  // Redirect velut.co.uk to www.velut.co.uk
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'velut.co.uk' }],
      destination: 'https://www.velut.co.uk/:path*',
      permanent: true,
    },
  ],
}

export default nextConfig
