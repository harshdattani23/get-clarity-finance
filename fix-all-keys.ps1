# Robust PowerShell script to fix ALL translation key patterns in lesson pages
# This script will find and replace all lesson-slug.keyName patterns

Write-Host "Starting comprehensive translation key fixes..." -ForegroundColor Green
Write-Host "This script will fix ALL lesson pages with wrong translation key patterns." -ForegroundColor Yellow
Write-Host ""

# Get all lesson page directories
$lessonPages = Get-ChildItem -Path "src/app/stock-market-course" -Directory | Where-Object { $_.Name -ne "using-key-financial-ratios-eps-p" }

$totalFixed = 0
$totalFilesProcessed = 0

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
            
            # Use regex matching without over-escaping
            $allMatches = [regex]::Matches($content, $pattern)
            $matchCount = $allMatches.Count
            
            if ($matchCount -gt 0) {
                Write-Host "  Found $matchCount patterns to fix" -ForegroundColor Cyan
                
                # Replace all occurrences of "lessonSlug." with empty string
                $newContent = $content -replace $pattern, ""
                
                # Write the fixed content back to the file
                Set-Content -Path $pageFile -Value $newContent -NoNewline
                
                Write-Host "  ✓ Fixed $matchCount translation keys" -ForegroundColor Green
                $totalFixed += $matchCount
                $totalFilesProcessed++
            } else {
                Write-Host "  - No patterns found (already fixed or using different pattern)" -ForegroundColor Gray
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
            $matchCount = ([regex]::Matches($content, $pattern)).Count
            
            if ($matchCount -gt 0) {
                Write-Host "  Found $matchCount patterns to fix in $relativePath" -ForegroundColor Cyan
                $newContent = $content -replace $pattern, ""
                Set-Content -Path $page.FullName -Value $newContent -NoNewline
                
                Write-Host "  ✓ Fixed $matchCount translation keys in $relativePath" -ForegroundColor Green
                $totalFixed += $matchCount
                $totalFilesProcessed++
            }
        }
        catch {
            Write-Host "  ✗ Error processing $($page.FullName): $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host "`nComprehensive translation key fix completed!" -ForegroundColor Green
Write-Host "Total files processed: $totalFilesProcessed" -ForegroundColor Cyan
Write-Host "Total translation keys fixed: $totalFixed" -ForegroundColor Cyan
Write-Host "All lesson pages should now work correctly with English translations." -ForegroundColor Green
