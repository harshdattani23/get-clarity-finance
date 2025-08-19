# Comprehensive PowerShell script to fix all translation issues in lesson pages
# This script fixes:
# 1. Wrong namespace format (slashes instead of dots)
# 2. Wrong translation key patterns (lesson-slug.keyName instead of just keyName)

Write-Host "Starting comprehensive translation fixes for all lesson pages..." -ForegroundColor Green
Write-Host "This will fix both namespace format and translation key patterns." -ForegroundColor Yellow
Write-Host ""

# Get all lesson page directories
$lessonPages = Get-ChildItem -Path "src/app/stock-market-course" -Directory | Where-Object { $_.Name -ne "using-key-financial-ratios-eps-p" }

$totalNamespaceFixed = 0
$totalKeysFixed = 0

foreach ($lesson in $lessonPages) {
    $pageFile = Join-Path $lesson.FullName "page.tsx"
    
    if (Test-Path $pageFile) {
        Write-Host "Processing: $($lesson.Name)" -ForegroundColor Yellow
        
        try {
            # Read the file content
            $content = Get-Content $pageFile -Raw
            
            # Fix 1: Namespace format (replace slash with dot)
            $oldNamespace = "stock-market-course/$($lesson.Name)"
            $newNamespace = "stock-market-course.$($lesson.Name)"
            
            if ($content -match [regex]::Escape($oldNamespace)) {
                $content = $content -replace [regex]::Escape($oldNamespace), $newNamespace
                $totalNamespaceFixed++
                Write-Host "  ✓ Fixed namespace format" -ForegroundColor Green
            }
            
            # Fix 2: Translation key patterns (remove lesson-slug. prefix)
            $lessonSlug = $lesson.Name
            $pattern = "$lessonSlug\."
            
            if ($content -match [regex]::Escape($pattern)) {
                $matchCount = ([regex]::Matches($content, [regex]::Escape($pattern))).Count
                $content = $content -replace [regex]::Escape($pattern), ""
                $totalKeysFixed += $matchCount
                Write-Host "  ✓ Fixed $matchCount translation keys" -ForegroundColor Green
            } else {
                Write-Host "  - No translation keys to fix" -ForegroundColor Gray
            }
            
            # Write the fixed content back to the file
            Set-Content -Path $pageFile -Value $content -NoNewline
            
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
            
            # Fix namespace format
            $oldNamespace = "stock-market-course/$relativePath"
            $newNamespace = "stock-market-course.$relativePath"
            
            if ($content -match [regex]::Escape($oldNamespace)) {
                $content = $content -replace [regex]::Escape($oldNamespace), $newNamespace
                $totalNamespaceFixed++
                Write-Host "  ✓ Fixed namespace format for $relativePath" -ForegroundColor Green
            }
            
            # Fix translation keys
            $pattern = "$lessonSlug\."
            if ($content -match [regex]::Escape($pattern)) {
                $matchCount = ([regex]::Matches($content, [regex]::Escape($pattern))).Count
                $content = $content -replace [regex]::Escape($pattern), ""
                $totalKeysFixed += $matchCount
                Write-Host "  ✓ Fixed $matchCount translation keys in $relativePath" -ForegroundColor Green
            }
            
            Set-Content -Path $page.FullName -Value $content -NoNewline
        }
        catch {
            Write-Host "  ✗ Error processing $($page.FullName): $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host "`nComprehensive translation fix completed!" -ForegroundColor Green
Write-Host "Total namespace formats fixed: $totalNamespaceFixed" -ForegroundColor Cyan
Write-Host "Total translation keys fixed: $totalKeysFixed" -ForegroundColor Cyan
Write-Host "All lesson pages should now work correctly with English translations." -ForegroundColor Green
