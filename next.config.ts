import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"], // Allow images from cdn.sanity.io
  },
};

export default nextConfig;
