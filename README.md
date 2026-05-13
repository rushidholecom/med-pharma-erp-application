# Pharma ERP Platform

This repository contains a professional starter ERP web application for a pharma company with:

- 10 Java Spring Boot microservices
- 1 React frontend dashboard
- Separate directories for each service
- Frontend integration for all backend services

## Microservices

| Service | Port | Purpose |
| --- | --- | --- |
| `auth-service` | `8081` | Identity, access control, and tenant context |
| `employee-service` | `8082` | HR, shifts, compliance readiness |
| `medicine-catalog-service` | `8083` | Product master, SKUs, formulations |
| `inventory-service` | `8084` | Stock visibility, batch quantities, reorder risk |
| `procurement-service` | `8085` | Suppliers, purchase orders, inbound planning |
| `sales-distribution-service` | `8086` | Customer orders, regional sales, dispatch commitments |
| `production-batch-service` | `8087` | Manufacturing lots, work orders, output tracking |
| `quality-control-service` | `8088` | QA holds, lab release status, audit readiness |
| `warehouse-logistics-service` | `8089` | Storage zones, cold-chain movement, dispatch lanes |
| `finance-billing-service` | `8090` | Revenue, payables, receivables, invoice health |

## Frontend

The frontend lives in `frontend/` and is built with React + TypeScript + Vite. It calls all 10 services directly through a central API configuration layer.

## Suggested Local Requirements

- Java 17+
- Maven 3.9+
- Node.js 20+
- npm 10+
- MongoDB 7+

Check local prerequisites with:

```powershell
.\scripts\check-prereqs.ps1
```

If PowerShell blocks local scripts, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\check-prereqs.ps1
```

## Run Backend Services

Open separate terminals and run:

```powershell
mvn -f auth-service/pom.xml spring-boot:run
mvn -f employee-service/pom.xml spring-boot:run
mvn -f medicine-catalog-service/pom.xml spring-boot:run
mvn -f inventory-service/pom.xml spring-boot:run
mvn -f procurement-service/pom.xml spring-boot:run
mvn -f sales-distribution-service/pom.xml spring-boot:run
mvn -f production-batch-service/pom.xml spring-boot:run
mvn -f quality-control-service/pom.xml spring-boot:run
mvn -f warehouse-logistics-service/pom.xml spring-boot:run
mvn -f finance-billing-service/pom.xml spring-boot:run
```

Or use the helper script:

```powershell
.\scripts\run-backends.ps1
```

If script execution is restricted:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-backends.ps1
```

## MongoDB Configuration

Each service now includes the MongoDB driver and its own default database URI in `application.yml`.

- `auth-service` -> `pharma_auth_db`
- `employee-service` -> `pharma_employee_db`
- `medicine-catalog-service` -> `pharma_catalog_db`
- `inventory-service` -> `pharma_inventory_db`
- `procurement-service` -> `pharma_procurement_db`
- `sales-distribution-service` -> `pharma_sales_db`
- `production-batch-service` -> `pharma_production_db`
- `quality-control-service` -> `pharma_quality_db`
- `warehouse-logistics-service` -> `pharma_warehouse_db`
- `finance-billing-service` -> `pharma_finance_db`

You can override each service independently:

```powershell
$env:AUTH_MONGODB_URI="mongodb://localhost:27017/pharma_auth_db"
$env:INVENTORY_MONGODB_URI="mongodb://localhost:27017/pharma_inventory_db"
```

Or set one shared fallback used by all services:

```powershell
$env:MONGODB_URI="mongodb://localhost:27017/pharma_shared_dev"
```

Per-service URIs take priority over the shared fallback.

## Run Frontend

```powershell
cd frontend
npm install
npm run dev
```

Or use the helper script:

```powershell
.\scripts\run-frontend.ps1
```

If script execution is restricted:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-frontend.ps1
```

## API Pattern

Each service exposes:

- `GET /api/v1/<module>/summary`
- `GET /api/v1/system/peers`
- `GET /actuator/health`

`/api/v1/system/peers` lets any service check the health of the other configured services, which is useful for validating service-to-service communication during development.

## Architecture Notes

See [docs/architecture.md](/c:/Users/rushi/application-10/docs/architecture.md) for module boundaries, endpoint conventions, and frontend integration notes.
