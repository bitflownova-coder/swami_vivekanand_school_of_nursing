#!/bin/bash

# SVS Nursing Website - Deployment Script for Hostinger
# This script automates deployment to production server

echo "🚀 Starting deployment to Hostinger..."

# Configuration
SERVER_USER="u984810592"
SERVER_HOST="72.61.252.200"
SERVER_PORT="65002"
SERVER_PATH="domains/svsnursing.org/public_html"
PROJECT_NAME="svs-nursing-site"

# Build the Next.js application
echo "🔨 Building Next.js application..."
npm run build

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf ${PROJECT_NAME}.tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=*.log \
  --exclude=.next/cache \
  --exclude=.env.example \
  .next \
  public \
  package.json \
  package-lock.json \
  ecosystem.config.js \
  next.config.js \
  .env \
  database

# Upload to server
echo "📤 Uploading to server..."
scp -P $SERVER_PORT ${PROJECT_NAME}.tar.gz ${SERVER_USER}@${SERVER_HOST}:~/${SERVER_PATH}/

# Execute deployment commands on server
echo "🔧 Deploying on server..."
ssh -p $SERVER_PORT ${SERVER_USER}@${SERVER_HOST} << 'ENDSSH'
cd domains/svsnursing.org/public_html

# Backup existing deployment
if [ -d "backup" ]; then
  rm -rf backup
fi
mkdir -p backup
if [ -d ".next" ]; then
  cp -r .next public package.json ecosystem.config.js backup/ 2>/dev/null || true
fi

# Extract new deployment
tar -xzf svs-nursing-site.tar.gz
rm svs-nursing-site.tar.gz

# Setup Node.js 20 environment
export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH

# Install dependencies
npm install --production

# Run database migrations
echo "Running database migrations..."
mysql -u u984810592_svs -p'sCARFACE@aMISHA@1804' u984810592_svs_cne < database/schema.sql 2>/dev/null || echo "Schema already exists"

# Create logs directory
mkdir -p logs

# Restart PM2
pm2 stop svs-nursing-website 2>/dev/null || true
pm2 delete svs-nursing-website 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

echo "✅ Deployment completed successfully!"
echo "🌐 Website: https://svsnursing.org"

ENDSSH

# Cleanup local package
rm ${PROJECT_NAME}.tar.gz

echo "✅ Deployment script finished!"
echo ""
echo "Next steps:"
echo "1. Visit https://svsnursing.org to verify deployment"
echo "2. Test all pages and CNE functionality"
echo "3. Check PM2 logs: ssh -p $SERVER_PORT ${SERVER_USER}@${SERVER_HOST} 'pm2 logs'"
