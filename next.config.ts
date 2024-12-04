/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qa-tierone-doc-analyzer.nyc3.digitaloceanspaces.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
