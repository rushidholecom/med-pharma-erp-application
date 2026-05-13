# Architecture Overview

## Platform Goal

This starter platform models a pharma ERP as 10 focused business microservices with a modern React operations dashboard. The design is intended to be easy to extend into a production system with persistence, authentication, service discovery, messaging, and CI/CD.

## Service Boundaries

1. `auth-service`
   Handles role visibility, active sessions, and authorization context.
2. `employee-service`
   Covers workforce readiness, training, and operational staffing.
3. `medicine-catalog-service`
   Owns medicine SKUs, dosage forms, and lifecycle state.
4. `inventory-service`
   Tracks batch-level stock and replenishment pressure.
5. `procurement-service`
   Manages vendor performance and pending purchase commitments.
6. `sales-distribution-service`
   Serves commercial order flow and outbound demand.
7. `production-batch-service`
   Represents manufacturing runs, line utilization, and releases.
8. `quality-control-service`
   Holds quality review data, deviations, and release decisions.
9. `warehouse-logistics-service`
   Tracks storage zones, cold-chain loads, and dispatch readiness.
10. `finance-billing-service`
    Summarizes revenue, collections, payables, and invoice throughput.

## Frontend Integration

The React application keeps a service registry in `frontend/src/config/services.ts`. Each entry defines:

- module title
- descriptive text
- direct backend base URL
- summary endpoint path
- UI theme data

The frontend loads all services with `Promise.allSettled()` so one unavailable service does not break the whole dashboard.

## MongoDB Strategy

Each microservice is configured with its own MongoDB database by default. This follows the normal microservice pattern where each service owns its data boundary even if all databases run on the same MongoDB server.

Configuration uses:

- service-specific env vars like `AUTH_MONGODB_URI`
- a shared fallback env var `MONGODB_URI`

This means you can start with one MongoDB instance locally and still keep clean logical separation by database name.

## Service-to-Service Communication

Each service now includes a development-friendly endpoint:

- `GET /api/v1/system/peers`

That endpoint reads peer URLs from `app.services.peers` in `application.yml` and calls each peer's `GET /actuator/health` endpoint. It is a simple service mesh check that confirms whether the other services are reachable.

## API Response Contract

Each backend returns a response similar to:

```json
{
  "serviceName": "inventory-service",
  "moduleTitle": "Inventory Control",
  "operationalStatus": "Healthy",
  "description": "Batch-wise stock view for API-driven dashboards.",
  "highlights": ["96.4% pick accuracy", "14 batches near reorder"],
  "metrics": {
    "liveBatches": 184,
    "fillRate": "98.2%"
  },
  "records": [
    {
      "item": "Paracetamol 500mg",
      "batchCode": "PCM-2408-A",
      "quantity": 14200
    }
  ],
  "lastUpdated": "2026-05-13T09:00:00Z"
}
```

## Production Upgrade Ideas

- Add PostgreSQL per service
- Add Spring Cloud Gateway and service discovery
- Add JWT auth with Keycloak or Spring Authorization Server
- Add Kafka for stock, QA, and production events
- Add OpenAPI specs and contract tests
- Add Docker Compose and Kubernetes manifests
