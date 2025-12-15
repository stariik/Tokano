/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "images.cdn.aurory.io",
        pathname: "**",
      },
      {
        protocol: 'https',
        hostname: 'images.cdn.aurory.io',
      },
    ],
  },
};

export default nextConfig;
