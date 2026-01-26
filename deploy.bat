@echo off
REM Deployment script for svsnursing.org
REM Run this script whenever you want to deploy code changes

echo ================================================
echo  SVS Nursing School - Production Deployment
echo ================================================
echo.

echo [1/5] Building application locally...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo.

echo [2/5] Compressing build...
tar -czf next-build.tar.gz .next
echo.

echo [3/5] Uploading to server...
scp -P 65002 next-build.tar.gz u984810592@72.61.252.200:domains/svsnursing.org/public_html/
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Upload failed!
    pause
    exit /b 1
)
echo.

echo [4/5] Extracting on server...
ssh -p 65002 u984810592@72.61.252.200 "cd domains/svsnursing.org/public_html && tar -xzf next-build.tar.gz && rm next-build.tar.gz"
echo.

echo [5/5] Restarting application...
ssh -p 65002 u984810592@72.61.252.200 "touch domains/svsnursing.org/public_html/tmp/restart.txt"
echo.

echo Cleaning up local files...
del next-build.tar.gz
echo.

echo ================================================
echo  Deployment Complete!
echo  Visit: https://svsnursing.org
echo ================================================
pause
