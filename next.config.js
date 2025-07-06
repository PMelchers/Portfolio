/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  // Optimize for client-side navigation
  trailingSlash: false,
  // Enable SWC minification
  swcMinify: true,
  // Optimize bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig