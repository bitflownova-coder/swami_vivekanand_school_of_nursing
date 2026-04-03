@echo off
echo Deploying to svsnursing.org...
echo You will be prompted for SSH password twice (extract + restart).
echo.

REM Step 1: Extract and install
ssh -p 65002 u984810592@72.61.252.200 "cd domains/svsnursing.org/public_html && tar -xzf svs-nursing-site.tar.gz && rm svs-nursing-site.tar.gz && export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH && npm install --production 2>&1 | tail -5 && mysql -u u984810592_svs -p'sCARFACE@aMISHA@1804' u984810592_svs_cne < database/migration-attendance-spot.sql 2>/dev/null; mkdir -p logs && echo INSTALL_DONE"

if %ERRORLEVEL% NEQ 0 (
    echo Step 1 failed!
    pause
    exit /b 1
)

REM Step 2: Restart PM2
ssh -p 65002 u984810592@72.61.252.200 "PM2=/home/u984810592/.npm/_npx/5f7878ce38f1eb13/node_modules/.bin/pm2 && $PM2 stop svs-nursing-website 2>/dev/null; $PM2 delete svs-nursing-website 2>/dev/null; $PM2 start domains/svsnursing.org/public_html/ecosystem.config.js && $PM2 save && echo DEPLOY_SUCCESS"

echo.
echo ============================================
echo  Deployment complete! Visit: https://svsnursing.org
echo ============================================
pause
