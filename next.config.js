/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: '',
        pathname: '/next-ecom-cloud/image/upload/**',
      }
    ]
  }
}

module.exports = nextConfig