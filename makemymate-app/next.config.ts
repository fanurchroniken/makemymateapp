import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Optimize for production
  swcMinify: true,
  // Disable telemetry
  telemetry: false,
};

export default nextConfig;
