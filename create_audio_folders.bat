@echo off
echo Creating audio folder structure for stock market course...

cd public\audio

echo Creating stock-market-course directory...
mkdir stock-market-course

cd stock-market-course

echo Creating course module directories...
mkdir basics
mkdir market-mechanics
mkdir getting-started
mkdir fundamental-analysis
mkdir technical-analysis
mkdir ipos-and-new-listings
mkdir mutual-funds
mkdir gold-and-commodities
mkdir currency-trading
mkdir derivatives
mkdir portfolio-management
mkdir advanced-technical
mkdir advanced-derivatives
mkdir other-markets
mkdir quantitative-trading
mkdir financial-planning

echo Creating lesson audio files in basics module...
cd basics
echo. > what-is-stock.mp3
echo. > types-of-stocks.mp3
echo. > what-is-stock-market.mp3
echo. > how-stocks-traded.mp3
cd ..

echo Creating lesson audio files in market-mechanics module...
cd market-mechanics
echo. > reading-stock-quote.mp3
echo. > bull-vs-bear-markets.mp3
echo. > market-indices.mp3
echo. > role-of-sebi.mp3
cd ..

echo Creating lesson audio files in getting-started module...
cd getting-started
echo. > opening-demat-trading-account.mp3
echo. > kyc-process.mp3
echo. > placing-first-trade.mp3
echo. > different-players-market.mp3
cd ..

echo Creating lesson audio files in fundamental-analysis module...
cd fundamental-analysis
echo. > intro-fundamental-analysis.mp3
echo. > reading-balance-sheet.mp3
echo. > reading-pl-statement.mp3
echo. > reading-cash-flow-statement.mp3
echo. > key-financial-ratios.mp3
cd ..

echo Creating lesson audio files in technical-analysis module...
cd technical-analysis
echo. > intro-technical-analysis.mp3
echo. > reading-candlestick-charts.mp3
echo. > trends-support-resistance.mp3
echo. > essential-technical-indicators.mp3
cd ..

echo Audio folder structure created successfully!
echo.
echo Next steps:
echo 1. Replace placeholder .mp3 files with actual audio content
echo 2. Update audio URLs in course modules
echo 3. Test audio playback functionality
echo.
pause
