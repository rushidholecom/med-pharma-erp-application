$root = Split-Path -Parent $PSScriptRoot
$command = "Set-Location '$root/frontend'; npm install; npm run dev"

Start-Process powershell -ArgumentList "-NoExit", "-Command", $command

Write-Host "Frontend terminal started at frontend/." -ForegroundColor Cyan
