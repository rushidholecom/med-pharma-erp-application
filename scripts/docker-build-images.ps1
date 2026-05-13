param(
    [string]$ImagePrefix = "pharma-erp",
    [string]$Tag = "local"
)

$backendServices = @(
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

foreach ($service in $backendServices) {
    $imageName = "$ImagePrefix-$service`:$Tag"
    Write-Host "Building $imageName" -ForegroundColor Cyan
    docker build --build-arg SERVICE_DIR=$service -f docker/backend.Dockerfile -t $imageName .
}

Write-Host "Building $ImagePrefix-frontend:$Tag" -ForegroundColor Cyan
docker build `
    --build-arg VITE_AUTH_SERVICE_URL=/proxy/auth-service `
    --build-arg VITE_EMPLOYEE_SERVICE_URL=/proxy/employee-service `
    --build-arg VITE_CATALOG_SERVICE_URL=/proxy/medicine-catalog-service `
    --build-arg VITE_INVENTORY_SERVICE_URL=/proxy/inventory-service `
    --build-arg VITE_PROCUREMENT_SERVICE_URL=/proxy/procurement-service `
    --build-arg VITE_SALES_SERVICE_URL=/proxy/sales-distribution-service `
    --build-arg VITE_PRODUCTION_SERVICE_URL=/proxy/production-batch-service `
    --build-arg VITE_QUALITY_SERVICE_URL=/proxy/quality-control-service `
    --build-arg VITE_WAREHOUSE_SERVICE_URL=/proxy/warehouse-logistics-service `
    --build-arg VITE_FINANCE_SERVICE_URL=/proxy/finance-billing-service `
    -f docker/frontend.Dockerfile `
    -t "$ImagePrefix-frontend:$Tag" .

