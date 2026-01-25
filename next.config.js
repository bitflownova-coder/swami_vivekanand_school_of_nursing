/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes for CNE system
  images: { unoptimized: true },
  // ESLint block removed to fix the warning
};

module.exports = nextConfig;
