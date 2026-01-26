@echo off
REM SVS Nursing Website - Windows Deployment Script for Hostinger

echo Starting deployment to Hostinger...

REM Configuration
set SERVER_USER=u984810592
set SERVER_HOST=72.61.252.200
set SERVER_PORT=65002
set SERVER_PATH=domains/svsnursing.org/public_html
set PROJECT_NAME=svs-nursing-site

REM Build Next.js application
echo Building Next.js application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    pause
    exit /b 1
)

REM Create deployment package
echo Creating deployment package...
tar -czf %PROJECT_NAME%.tar.gz --exclude=node_modules --exclude=.git --exclude=*.log --exclude=.next/cache --exclude=.env.example .next public package.json package-lock.json ecosystem.config.js next.config.js .env database

REM Upload to server
echo Uploading to server...
scp -P %SERVER_PORT% %PROJECT_NAME%.tar.gz %SERVER_USER%@%SERVER_HOST%:~/%SERVER_PATH%/

REM Deploy on server
echo Deploying on server...
ssh -p %SERVER_PORT% %SERVER_USER%@%SERVER_HOST% "cd %SERVER_PATH% && tar -xzf %PROJECT_NAME%.tar.gz && rm %PROJECT_NAME%.tar.gz && export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH && npm install --production && mysql -u u984810592_svs -p'sCARFACE@aMISHA@1804' u984810592_svs_cne < database/schema.sql 2>/dev/null; mkdir -p logs && pm2 stop svs-nursing-website 2>/dev/null; pm2 delete svs-nursing-website 2>/dev/null; pm2 start ecosystem.config.js && pm2 save"

REM Cleanup
del %PROJECT_NAME%.tar.gz

echo.
echo Deployment completed!
echo Visit: https://svsnursing.org
echo.
echo Check logs with: ssh -p %SERVER_PORT% %SERVER_USER%@%SERVER_HOST% "pm2 logs"
echo.
pause
