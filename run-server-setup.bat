@echo off
REM Complete server setup - upload and run setup script

echo ================================================
echo  SVS Nursing - Complete Server Setup
echo ================================================
echo.

echo This will:
echo 1. Upload the setup script to the server
echo 2. Make it executable
echo 3. Run it to fix Prisma and database
echo.
echo Press any key to continue...
pause >nul
echo.

echo Step 1: Uploading setup script...
scp -P 65002 setup-server.sh u984810592@72.61.252.200:domains/svsnursing.org/public_html/
echo.

echo Step 2: Making script executable and running it...
ssh -p 65002 u984810592@72.61.252.200 "cd domains/svsnursing.org/public_html && chmod +x setup-server.sh && ./setup-server.sh"
echo.

echo ================================================
echo  Setup Complete!
echo  Wait 2-3 minutes then visit https://svsnursing.org
echo ================================================
echo.
pause
