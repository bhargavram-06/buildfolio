import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      root: __dirname, // Forces Turbopack to only look inside the buildfolio folder
    },
  },
};

export default nextConfig;