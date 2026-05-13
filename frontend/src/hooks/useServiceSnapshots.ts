import { useEffect, useState } from "react";
import { serviceDefinitions } from "../config/services";
import { ServiceDefinition, ServiceSnapshot, ServiceState } from "../types";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function loadService(definition: ServiceDefinition): Promise<ServiceState> {
  const [summaryResult, healthResult] = await Promise.allSettled([
    fetchJson<ServiceSnapshot>(`${definition.baseUrl}${definition.summaryPath}`),
    fetchJson<{ status?: string }>(`${definition.baseUrl}${definition.healthPath}`)
  ]);

  const snapshot = summaryResult.status === "fulfilled" ? summaryResult.value : undefined;
  const health = healthResult.status === "fulfilled" ? healthResult.value.status ?? "UNKNOWN" : "DOWN";
  const online = Boolean(snapshot) || health === "UP";

  return {
    definition,
    status: online ? "online" : "offline",
    health,
    snapshot,
    error:
      summaryResult.status === "rejected"
        ? summaryResult.reason instanceof Error
          ? summaryResult.reason.message
          : "Summary endpoint unavailable"
        : undefined
  };
}

export function useServiceSnapshots() {
  const [services, setServices] = useState<ServiceState[]>(
    serviceDefinitions.map((definition) => ({
      definition,
      status: "loading",
      health: "Loading"
    }))
  );

  useEffect(() => {
    let active = true;

    async function loadAll() {
      const results = await Promise.all(serviceDefinitions.map(loadService));

      if (active) {
        setServices(results);
      }
    }

    loadAll().catch(() => {
      if (active) {
        setServices(
          serviceDefinitions.map((definition) => ({
            definition,
            status: "offline",
            health: "DOWN",
            error: "Unable to reach the service."
          }))
        );
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return services;
}

