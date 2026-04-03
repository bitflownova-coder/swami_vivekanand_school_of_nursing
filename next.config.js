/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes for CNE system
  images: { unoptimized: true },

  // Fix: tell Turbopack the correct workspace root (prevents 404s from parent lockfile detection)
  turbopack: {
    root: __dirname,
  },
  
  // Optimized for Cloud Startup: 4GB RAM, 2 CPU cores, 100-200 concurrent users
  experimental: {
    workerThreads: false,
    cpus: 2,
  },
  
  // Optimize production build
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,

  // Force browsers to never serve stale cached pages
  async headers() {
    return [
      {
        source: '/cne/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate, s-maxage=0, proxy-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
          { key: 'Surrogate-Control', value: 'no-store' },
          { key: 'CDN-Cache-Control', value: 'no-store' },
        ],
      },
      {
        source: '/cne',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate, s-maxage=0, proxy-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
          { key: 'Surrogate-Control', value: 'no-store' },
          { key: 'CDN-Cache-Control', value: 'no-store' },
        ],
      },
      {
        source: '/api/cne/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate, s-maxage=0' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
