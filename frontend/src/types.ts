export type MetricValue = string | number | boolean;
export type RecordValue = string | number | boolean | null;

export interface ServiceSnapshot {
  serviceName: string;
  moduleTitle: string;
  operationalStatus: string;
  description: string;
  highlights: string[];
  metrics: Record<string, MetricValue>;
  records: Array<Record<string, RecordValue>>;
  lastUpdated: string;
}

export interface ServiceDefinition {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  baseUrl: string;
  summaryPath: string;
  healthPath: string;
  accent: string;
  tags: string[];
}

export interface ServiceState {
  definition: ServiceDefinition;
  status: "loading" | "online" | "offline";
  health: string;
  snapshot?: ServiceSnapshot;
  error?: string;
}

