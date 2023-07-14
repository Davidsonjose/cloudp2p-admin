/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ui-avatars.com", "res.cloudinary.com"],
  },
  // appDir: true
};

module.exports = nextConfig;
