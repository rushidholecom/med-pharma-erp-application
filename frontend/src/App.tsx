import { useState } from "react";
import { DetailPanel } from "./components/DetailPanel";
import { KpiStrip } from "./components/KpiStrip";
import { ServiceCard } from "./components/ServiceCard";
import { useServiceSnapshots } from "./hooks/useServiceSnapshots";

export default function App() {
  const services = useServiceSnapshots();
  const [selectedKey, setSelectedKey] = useState("inventory");

  const selectedService =
    services.find((service) => service.definition.key === selectedKey) ?? services[0];
  const onlineServices = services.filter((service) => service.status === "online").length;
  const totalRecords = services.reduce(
    (total, service) => total + (service.snapshot?.records.length ?? 0),
    0
  );
  const liveCoverage = `${Math.round((onlineServices / services.length) * 100)}%`;

  return (
    <div className="app-shell">
      <div className="bg-orb bg-orb--one" />
      <div className="bg-orb bg-orb--two" />
      <div className="bg-grid" />

      <header className="hero">
        <div className="hero__copy">
          <span className="eyebrow">Pharma ERP Web Application</span>
          <h1>Java microservices backend with an impressive React command center.</h1>
          <p>
            This workspace includes 10 separate Spring Boot services for a pharma company and a
            frontend that connects to every module for operations visibility.
          </p>
          <div className="hero__chips">
            <span>10 Microservices</span>
            <span>React + TypeScript</span>
            <span>Spring Boot 3</span>
            <span>Pharma ERP Focus</span>
          </div>
        </div>

        <aside className="hero__panel">
          <span className="eyebrow">Delivery Scope</span>
          <div className="hero-metric">
            <strong>Business Modules</strong>
            <span>Auth, HR, Catalog, Inventory, Procurement, Sales, Production, QA, Warehouse, Finance</span>
          </div>
          <div className="hero-metric">
            <strong>Integration Pattern</strong>
            <span>Shared frontend registry with direct service health and summary calls</span>
          </div>
          <div className="hero-metric">
            <strong>Starter Quality</strong>
            <span>Clean structure, seeded payloads, extensible endpoints, and environment-based URLs</span>
          </div>
        </aside>
      </header>

      <main className="content">
        <KpiStrip
          totalServices={services.length}
          onlineServices={onlineServices}
          totalRecords={totalRecords}
          liveCoverage={liveCoverage}
        />

        <section className="section-head">
          <div>
            <span className="eyebrow">Connected Services</span>
            <h2>Microservice Fleet</h2>
          </div>
          <p>Select any module to inspect the data contract already wired into the frontend.</p>
        </section>

        <section className="service-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.definition.key}
              item={service}
              active={selectedService?.definition.key === service.definition.key}
              onSelect={setSelectedKey}
            />
          ))}
        </section>

        {selectedService ? <DetailPanel item={selectedService} /> : null}

        <section className="architecture-strip">
          <article className="glass-panel">
            <span className="eyebrow">Frontend Integration</span>
            <h3>All 10 backend services are mapped in one config layer.</h3>
            <p>
              Update URLs in <code>frontend/.env.example</code> or promote them to local env files
              for different environments.
            </p>
          </article>

          <article className="glass-panel">
            <span className="eyebrow">Backend Pattern</span>
            <h3>Each microservice exposes a summary endpoint plus actuator health.</h3>
            <p>
              This makes it easy to extend with databases, auth, messaging, or an API gateway
              later.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}

