@echo off
REM Git-based deployment script for svsnursing.org
REM This pulls the latest code from GitHub to the live server

echo ================================================
echo  SVS Nursing School - Git Deployment
echo ================================================
echo.

echo Make sure you have:
echo 1. Committed all changes locally
echo 2. Pushed to GitHub
echo.
echo Press any key to continue deployment...
pause >nul
echo.

echo Connecting to server and pulling latest code...
echo.
echo NOTE: You will be prompted for SSH password
echo Password should be entered when requested
echo.

ssh -p 65002 u984810592@72.61.252.200 "cd domains/svsnursing.org/public_html && echo 'Current directory:' && pwd && echo 'Pulling latest code...' && git pull && echo 'Restarting application...' && mkdir -p tmp && touch tmp/restart.txt && echo 'Deployment completed!' && echo 'Wait 2-3 minutes for Passenger to rebuild'"

echo.
echo ================================================
echo  Deployment Command Executed!
echo  Wait 2-3 minutes for changes to appear
echo  Visit: https://svsnursing.org
echo ================================================
echo.
pause
