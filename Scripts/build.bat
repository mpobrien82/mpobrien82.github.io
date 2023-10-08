@echo off
REM Make the build.sh script executable on Windows
icacls Scripts\build.sh /grant Everyone:(RX)
REM Run the build.sh script
Scripts\build.sh
