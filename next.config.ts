import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Optimize local screenshots
    formats: ["image/webp", "image/avif"],
  },
  // Server-only modules — never sent to browser
  serverExternalPackages: [],
  // Strict mode
  reactStrictMode: true,
};

export default nextConfig;
