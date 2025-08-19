@echo off
echo Creating audio module folders...

mkdir "public\audio\lessons\introduction" 2>nul
mkdir "public\audio\lessons\technical-analysis" 2>nul
mkdir "public\audio\lessons\risk-management" 2>nul
mkdir "public\audio\lessons\fundamental-analysis" 2>nul
mkdir "public\audio\lessons\options-trading" 2>nul
mkdir "public\audio\lessons\futures-trading" 2>nul
mkdir "public\audio\lessons\mutual-funds" 2>nul
mkdir "public\audio\lessons\portfolio-management" 2>nul
mkdir "public\audio\lessons\market-psychology" 2>nul
mkdir "public\audio\lessons\advanced-strategies" 2>nul

echo Audio folders created successfully!
echo.
echo Folder structure:
echo public\audio\lessons\
dir "public\audio\lessons" /b
echo.
echo Script completed. Self-deleting...
del "%~f0"
