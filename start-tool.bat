@echo off
cd /d "%~dp0"
start "Heyum CS Server" cmd /k ""C:\Program Files\nodejs\node.exe" server.mjs"
timeout /t 2 /nobreak >nul
start http://localhost:3000
