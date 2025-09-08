/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ["localhost:3000"] }
  },
  reactStrictMode: true,
  poweredByHeader: false,
  images: { remotePatterns: [] },
};

export default nextConfig;
