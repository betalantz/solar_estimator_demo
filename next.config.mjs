// @ts-check
/** 
 * @type {import('next').NextConfig} 
 */
export const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/app/api/:path*",
      },
    ];
  },
};