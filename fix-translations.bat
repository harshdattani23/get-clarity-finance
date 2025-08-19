@echo off
echo Starting translation key fixes for all lesson pages...
echo.

powershell -ExecutionPolicy Bypass -File "fix-translations.ps1"

echo.
echo Batch script completed!
pause
