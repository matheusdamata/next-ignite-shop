/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,

  images: {
    domains: ['files.stripe.com'],
  },
}

module.exports = nextConfig
