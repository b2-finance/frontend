/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: process.env.AUTH_ENDPOINT + '/:path*'
      },
      {
        source: '/b2/:path*',
        destination: process.env.B2_ENDPOINT + '/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
