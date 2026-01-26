#!/bin/bash
# Server-side Prisma setup script
# This should be uploaded and run on the server

echo "================================================"
echo " SVS Nursing - Prisma Setup"
echo "================================================"
echo ""

cd /home/u984810592/domains/svsnursing.org/public_html || exit

echo "Step 1: Checking .env file..."
if [ ! -f .env ]; then
    echo "ERROR: .env file not found!"
    exit 1
fi
echo "✓ .env file exists"
echo ""

echo "Step 2: Installing dependencies..."
npm install --production
echo "✓ Dependencies installed"
echo ""

echo "Step 3: Generating Prisma Client..."
npx prisma generate
echo "✓ Prisma Client generated"
echo ""

echo "Step 4: Running database migrations..."
npx prisma migrate deploy
echo "✓ Migrations completed"
echo ""

echo "Step 5: Restarting application..."
mkdir -p tmp
touch tmp/restart.txt
echo "✓ Restart triggered"
echo ""

echo "================================================"
echo " Setup Complete!"
echo " Wait 2-3 minutes for application to restart"
echo "================================================"
