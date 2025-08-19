# PowerShell script to fix translation keys in all lesson pages
# This script removes the lesson slug prefix from all t() function calls

Write-Host "Starting translation key fixes for all lesson pages..." -ForegroundColor Green

# Get all lesson page directories
$lessonPages = Get-ChildItem -Path "src/app/stock-market-course" -Directory | Where-Object { $_.Name -ne "using-key-financial-ratios-eps-p" }

$totalFixed = 0

foreach ($lesson in $lessonPages) {
    $pageFile = Join-Path $lesson.FullName "page.tsx"
    
    if (Test-Path $pageFile) {
        Write-Host "Processing: $($lesson.Name)" -ForegroundColor Yellow
        
        try {
            # Read the file content
            $content = Get-Content $pageFile -Raw
            
            # Get the lesson slug from directory name
            $lessonSlug = $lesson.Name
            
            # Create the pattern to match: lessonSlug.keyName
            $pattern = "$lessonSlug\."
            
            # Count how many replacements will be made
            $matchCount = ([regex]::Matches($content, [regex]::Escape($pattern))).Count
            
            if ($matchCount -gt 0) {
                # Replace all occurrences of "lessonSlug." with empty string
                $newContent = $content -replace [regex]::Escape($pattern), ""
                
                # Write the fixed content back to the file
                Set-Content -Path $pageFile -Value $newContent -NoNewline
                
                Write-Host "  ✓ Fixed $matchCount translation keys" -ForegroundColor Green
                $totalFixed += $matchCount
            } else {
                Write-Host "  - No translation keys to fix" -ForegroundColor Gray
            }
        }
        catch {
            Write-Host "  ✗ Error processing $($lesson.Name): $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# Handle the special case directory with nested structure
$specialDir = "src/app/stock-market-course/using-key-financial-ratios-eps-p"
if (Test-Path $specialDir) {
    Write-Host "Processing special directory: using-key-financial-ratios-eps-p" -ForegroundColor Yellow
    
    $nestedPages = Get-ChildItem -Path $specialDir -Recurse -Filter "page.tsx"
    foreach ($page in $nestedPages) {
        try {
            $content = Get-Content $page.FullName -Raw
            
            # For nested pages, we need to handle the full path structure
            $relativePath = $page.FullName.Replace("src/app/stock-market-course/", "").Replace("/page.tsx", "")
            $lessonSlug = $relativePath.Replace("/", "-")
            
            $pattern = "$lessonSlug\."
            $matchCount = ([regex]::Matches($content, [regex]::Escape($pattern))).Count
            
            if ($matchCount -gt 0) {
                $newContent = $content -replace [regex]::Escape($pattern), ""
                Set-Content -Path $page.FullName -Value $newContent -NoNewline
                
                Write-Host "  ✓ Fixed $matchCount translation keys in $relativePath" -ForegroundColor Green
                $totalFixed += $matchCount
            }
        }
        catch {
            Write-Host "  ✗ Error processing $($page.FullName): $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host "`nTranslation fix completed!" -ForegroundColor Green
Write-Host "Total translation keys fixed: $totalFixed" -ForegroundColor Cyan
Write-Host "All lesson pages should now work correctly with English translations." -ForegroundColor Green

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
