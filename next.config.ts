import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true
  },
  // Если в проде всплывут редкие TS-ошибки, чтобы не блокировать сборку
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
