# Fix translation casting issues in lesson files
Write-Host "Fixing translation casting issues..." -ForegroundColor Green

$lessonFiles = Get-ChildItem -Path "src/app/stock-market-course" -Filter "page.tsx" -Recurse

foreach ($file in $lessonFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Yellow
    
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Fix t('key') patterns that need casting
    $content = $content -replace '(\{\s*)t\(([^)]+)\)(\s*\})', '$1t($2) as string$3'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "  ✓ Fixed" -ForegroundColor Green
    } else {
        Write-Host "  - No changes" -ForegroundColor Gray
    }
}

Write-Host "Done!" -ForegroundColor Green
