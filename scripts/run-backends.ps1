$services = @(
    "auth-service",
    "employee-service",
    "medicine-catalog-service",
    "inventory-service",
    "procurement-service",
    "sales-distribution-service",
    "production-batch-service",
    "quality-control-service",
    "warehouse-logistics-service",
    "finance-billing-service"
)

$root = Split-Path -Parent $PSScriptRoot

foreach ($service in $services) {
    $command = "Set-Location '$root'; mvn -f $service/pom.xml spring-boot:run"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $command
}

Write-Host "Backend service terminals started. Review each window for startup logs." -ForegroundColor Cyan

