/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: [
      "www.google.com",
      "encrypted-tbn0.gstatic.com",
      "res.cloudinary.com",
      "cdn.pixabay.com",
    ],
  },
};

export default nextConfig;
