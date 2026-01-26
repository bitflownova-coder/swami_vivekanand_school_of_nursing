@echo off
REM Fix Prisma on server - regenerate client for correct platform

echo ================================================
echo  Fixing Prisma Client on Server
echo ================================================
echo.

echo This will:
echo 1. Regenerate Prisma Client for the server platform
echo 2. Run database migrations
echo 3. Restart the application
echo.
echo Press any key to continue...
pause >nul
echo.

echo Connecting to server...
echo NOTE: You will be prompted for SSH password multiple times
echo.

ssh -p 65002 u984810592@72.61.252.200 "cd domains/svsnursing.org/public_html && echo 'Step 1: Regenerating Prisma Client...' && npx prisma generate && echo 'Step 2: Running migrations...' && npx prisma migrate deploy && echo 'Step 3: Restarting application...' && mkdir -p tmp && touch tmp/restart.txt && echo 'Done! Wait 2-3 minutes for changes to take effect'"

echo.
echo ================================================
echo  Prisma Fix Complete!
echo  Wait 2-3 minutes then test the website
echo ================================================
echo.
pause
