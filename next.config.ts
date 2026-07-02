import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    return [
      {
        source: "/archive/shanding",
        destination: "/shanding/index.html",
      },
    ];
  },
};

export default nextConfig;
