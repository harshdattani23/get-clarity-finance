@echo off
echo Creating audio file structure for "What is a Stock Market?" lesson...
echo.

echo The following audio files need to be created for the second lesson:
echo.
echo 1. what-is-stock-market-en.m4a (English)
echo 2. what-is-stock-market-hi.m4a (Hindi)
echo 3. what-is-stock-market-bn.m4a (Bengali)
echo 4. what-is-stock-market-mr.m4a (Marathi)
echo 5. what-is-stock-market-gu.m4a (Gujarati)
echo 6. what-is-stock-market-ta.m4a (Tamil)
echo.

echo Content should cover:
echo - Definition of stock markets
echo - Supermarket analogy
echo - Core functions (capital formation, liquidity, price discovery, wealth creation)
echo - Major exchanges (NSE and BSE)
echo - Key concepts and takeaways
echo.

echo After creating the audio files, upload them to Google Cloud Storage:
echo gsutil cp "filename.m4a" gs://getclarity-audio-bucket/lessons/introduction/filename.m4a
echo.

pause
