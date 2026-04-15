/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "localhost",
      "images.unsplash.com",
      "upload.wikimedia.org",
      "randomuser.me",
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": require("path").resolve(__dirname, "src"),
    };
    return config;
  },
};

module.exports = nextConfig;
