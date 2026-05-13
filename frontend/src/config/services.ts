import { ServiceDefinition } from "../types";

const env = import.meta.env;

export const serviceDefinitions: ServiceDefinition[] = [
  {
    key: "auth",
    title: "Identity & Access",
    subtitle: "Roles, MFA, security posture",
    description: "Controls secure role-based access across regulated ERP workflows.",
    baseUrl: env.VITE_AUTH_SERVICE_URL ?? "http://localhost:8081",
    summaryPath: "/api/v1/auth/summary",
    healthPath: "/actuator/health",
    accent: "#7ce7cf",
    tags: ["Security", "Audit", "IAM"]
  },
  {
    key: "employee",
    title: "Workforce Readiness",
    subtitle: "Shifts, training, compliance",
    description: "Tracks staffing capacity and GMP-ready workforce coverage.",
    baseUrl: env.VITE_EMPLOYEE_SERVICE_URL ?? "http://localhost:8082",
    summaryPath: "/api/v1/employees/summary",
    healthPath: "/actuator/health",
    accent: "#f7cb6b",
    tags: ["HR", "Training", "GMP"]
  },
  {
    key: "catalog",
    title: "Medicine Catalog",
    subtitle: "SKUs, formulations, lifecycle",
    description: "Maintains product master data used throughout the ERP network.",
    baseUrl: env.VITE_CATALOG_SERVICE_URL ?? "http://localhost:8083",
    summaryPath: "/api/v1/catalog/summary",
    healthPath: "/actuator/health",
    accent: "#8ab4ff",
    tags: ["Master Data", "Products", "SKU"]
  },
  {
    key: "inventory",
    title: "Inventory Control",
    subtitle: "Batches, stock, availability",
    description: "Provides batch-level stock intelligence for finished goods and materials.",
    baseUrl: env.VITE_INVENTORY_SERVICE_URL ?? "http://localhost:8084",
    summaryPath: "/api/v1/inventory/summary",
    healthPath: "/actuator/health",
    accent: "#ff9f7a",
    tags: ["Stock", "Batches", "Planning"]
  },
  {
    key: "procurement",
    title: "Procurement",
    subtitle: "Suppliers, POs, inbound risk",
    description: "Manages supplier commitments and inbound material flow.",
    baseUrl: env.VITE_PROCUREMENT_SERVICE_URL ?? "http://localhost:8085",
    summaryPath: "/api/v1/procurement/summary",
    healthPath: "/actuator/health",
    accent: "#b3f07e",
    tags: ["Vendors", "Supply", "PO"]
  },
  {
    key: "sales",
    title: "Sales & Distribution",
    subtitle: "Orders, revenue, dispatch",
    description: "Surfaces order pressure and regional service execution.",
    baseUrl: env.VITE_SALES_SERVICE_URL ?? "http://localhost:8086",
    summaryPath: "/api/v1/sales/summary",
    healthPath: "/actuator/health",
    accent: "#f48fe0",
    tags: ["Demand", "OTIF", "Orders"]
  },
  {
    key: "production",
    title: "Production & Batch",
    subtitle: "Lots, work orders, throughput",
    description: "Monitors manufacturing line progress and batch execution.",
    baseUrl: env.VITE_PRODUCTION_SERVICE_URL ?? "http://localhost:8087",
    summaryPath: "/api/v1/production/summary",
    healthPath: "/actuator/health",
    accent: "#6ed4ff",
    tags: ["Manufacturing", "Lots", "Scheduling"]
  },
  {
    key: "quality",
    title: "Quality Control",
    subtitle: "Release, deviations, QA",
    description: "Keeps release quality, lab queues, and deviations in view.",
    baseUrl: env.VITE_QUALITY_SERVICE_URL ?? "http://localhost:8088",
    summaryPath: "/api/v1/quality/summary",
    healthPath: "/actuator/health",
    accent: "#ffb36a",
    tags: ["QA", "Release", "Compliance"]
  },
  {
    key: "warehouse",
    title: "Warehouse & Logistics",
    subtitle: "Zones, cold chain, dispatch",
    description: "Tracks storage, logistics lanes, and cold-chain readiness.",
    baseUrl: env.VITE_WAREHOUSE_SERVICE_URL ?? "http://localhost:8089",
    summaryPath: "/api/v1/warehouse/summary",
    healthPath: "/actuator/health",
    accent: "#7fffd4",
    tags: ["Storage", "Cold Chain", "Dispatch"]
  },
  {
    key: "finance",
    title: "Finance & Billing",
    subtitle: "Revenue, AR/AP, invoicing",
    description: "Summarizes financial throughput and cash discipline indicators.",
    baseUrl: env.VITE_FINANCE_SERVICE_URL ?? "http://localhost:8090",
    summaryPath: "/api/v1/finance/summary",
    healthPath: "/actuator/health",
    accent: "#e5abff",
    tags: ["Finance", "Billing", "Collections"]
  }
];

