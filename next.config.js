/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.B2_ENDPOINT + '/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
