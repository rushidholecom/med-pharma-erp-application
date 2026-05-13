import { ServiceState } from "../types";

function formatLabel(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function DetailPanel({ item }: { item: ServiceState }) {
  const snapshot = item.snapshot;
  const columns = snapshot?.records[0] ? Object.keys(snapshot.records[0]) : [];

  return (
    <section className="detail-panel">
      <div className="detail-panel__header">
        <div>
          <span className="eyebrow">Module Focus</span>
          <h2>{item.definition.title}</h2>
          <p>{snapshot?.description ?? item.definition.description}</p>
        </div>
        <div className="endpoint-box">
          <span>Status</span>
          <strong>{item.health}</strong>
          <small>{item.definition.baseUrl + item.definition.summaryPath}</small>
        </div>
      </div>

      {!snapshot ? (
        <div className="offline-state">
          <h3>Service data is not available yet</h3>
          <p>{item.error ?? "Start the backend service to populate this module in the dashboard."}</p>
        </div>
      ) : (
        <>
          <div className="metrics-grid">
            {Object.entries(snapshot.metrics).map(([key, value]) => (
              <article className="metric-tile" key={key}>
                <span>{formatLabel(key)}</span>
                <strong>{String(value)}</strong>
              </article>
            ))}
          </div>

          <div className="detail-grid">
            <article className="glass-panel">
              <span className="eyebrow">Operational Highlights</span>
              <ul className="highlight-list">
                {snapshot.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>

            <article className="glass-panel">
              <span className="eyebrow">Latest Refresh</span>
              <h3>{new Date(snapshot.lastUpdated).toLocaleString()}</h3>
              <p>{snapshot.operationalStatus} service condition reported by backend.</p>
            </article>
          </div>

          <article className="glass-panel data-table-panel">
            <div className="data-table-panel__header">
              <span className="eyebrow">Module Records</span>
              <strong>{snapshot.records.length} visible rows</strong>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column}>{formatLabel(column)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {snapshot.records.map((record, index) => (
                    <tr key={`${item.definition.key}-${index}`}>
                      {columns.map((column) => (
                        <td key={column}>{String(record[column] ?? "-")}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </>
      )}
    </section>
  );
}

