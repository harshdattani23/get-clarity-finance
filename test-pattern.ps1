# Test script to debug pattern matching
Write-Host "Testing pattern matching..." -ForegroundColor Green

$testFile = "src/app/stock-market-course/how-stocks-are-traded/page.tsx"
$content = Get-Content $testFile -Raw

Write-Host "File content length: $($content.Length)" -ForegroundColor Yellow

# Test different pattern matching approaches
$lessonSlug = "how-stocks-are-traded"
$pattern1 = "$lessonSlug\."
$pattern2 = [regex]::Escape($pattern1)

Write-Host "Pattern 1: '$pattern1'" -ForegroundColor Cyan
Write-Host "Pattern 2 (escaped): '$pattern2'" -ForegroundColor Cyan

# Test simple string matching
$simpleMatches = $content -match $pattern1
Write-Host "Simple matches found: $($simpleMatches.Count)" -ForegroundColor Yellow

# Test regex matching
$regexMatches = [regex]::Matches($content, $pattern1)
Write-Host "Regex matches found: $($regexMatches.Count)" -ForegroundColor Yellow

# Test escaped regex matching
$escapedMatches = [regex]::Matches($content, $pattern2)
Write-Host "Escaped regex matches found: $($escapedMatches.Count)" -ForegroundColor Yellow

# Show first few matches
if ($regexMatches.Count -gt 0) {
    Write-Host "First 3 matches:" -ForegroundColor Green
    for ($i = 0; $i -lt [Math]::Min(3, $regexMatches.Count); $i++) {
        Write-Host "  $($regexMatches[$i].Value)" -ForegroundColor White
    }
}
