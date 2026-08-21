import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/articles",
        destination: "/media",
        permanent: true,
      },
      {
        source: "/articles/:path*",
        destination: "/media/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;