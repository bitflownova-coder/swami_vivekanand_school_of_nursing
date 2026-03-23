#!/bin/bash
export PATH=/opt/alt/alt-nodejs20/root/usr/bin:/usr/local/bin:/usr/bin:/bin:$HOME/bin:$PATH
cd $HOME/domains/svsnursing.org/public_html

echo "=== Checking PM2 ==="
if command -v pm2 &> /dev/null; then
    echo "PM2 found globally"
    pm2 stop svs-nursing-website 2>/dev/null
    pm2 delete svs-nursing-website 2>/dev/null
    pm2 start ecosystem.config.js
    pm2 save
elif [ -f "node_modules/pm2/bin/pm2" ]; then
    echo "PM2 found in node_modules"
    node node_modules/pm2/bin/pm2 stop svs-nursing-website 2>/dev/null
    node node_modules/pm2/bin/pm2 delete svs-nursing-website 2>/dev/null
    node node_modules/pm2/bin/pm2 start ecosystem.config.js
    node node_modules/pm2/bin/pm2 save
else
    echo "PM2 NOT found. Installing..."
    npm install pm2
    node node_modules/pm2/bin/pm2 stop svs-nursing-website 2>/dev/null
    node node_modules/pm2/bin/pm2 delete svs-nursing-website 2>/dev/null
    node node_modules/pm2/bin/pm2 start ecosystem.config.js
    node node_modules/pm2/bin/pm2 save
fi

echo "=== Done ==="
echo "Checking status..."
if command -v pm2 &> /dev/null; then
    pm2 status
else
    node node_modules/pm2/bin/pm2 status
fi
