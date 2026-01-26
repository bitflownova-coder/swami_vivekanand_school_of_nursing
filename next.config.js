/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes for CNE system
  images: { unoptimized: true },
  
  // Optimized for Cloud Startup: 4GB RAM, 2 CPU cores, 100-200 concurrent users
  experimental: {
    workerThreads: false,
    cpus: 2
  },
  
  // Optimize production build
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  swcMinify: true,
};

module.exports = nextConfig;
