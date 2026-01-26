@echo off
REM Setup Git repository on the server
REM This is a one-time setup

echo ================================================
echo  SVS Nursing School - Git Setup on Server
echo ================================================
echo.

echo This will initialize Git on the server and pull from GitHub
echo.
echo NOTE: You will be prompted for SSH password
echo.
pause

ssh -p 65002 u984810592@72.61.252.200 "cd domains/svsnursing.org/public_html && echo 'Initializing Git repository...' && git init && echo 'Adding GitHub remote...' && git remote add origin https://github.com/bitflownova-coder/swami_vivekanand_school_of_nursing.git && echo 'Fetching from GitHub...' && git fetch && echo 'Resetting to latest code...' && git reset --hard origin/main && echo 'Git setup complete!' && mkdir -p tmp && touch tmp/restart.txt"

echo.
echo ================================================
echo  Git Setup Complete!
echo  Now you can use deploy-git.bat for future updates
echo ================================================
echo.
pause
