# PowerShell script to commit and push all changes
Write-Host "🚀 Pushing all changes to repository..." -ForegroundColor Green

# Add all changes
git add .
Write-Host "✅ Files added to staging" -ForegroundColor Yellow

# Commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Auto-update: $timestamp"
Write-Host "✅ Changes committed" -ForegroundColor Yellow

# Push to main branch
git push origin main
Write-Host "✅ Pushed to repository successfully!" -ForegroundColor Green
Write-Host "🌐 Repository updated at: $timestamp" -ForegroundColor Cyan
