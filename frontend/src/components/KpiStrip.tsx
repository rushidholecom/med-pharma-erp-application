interface KpiStripProps {
  totalServices: number;
  onlineServices: number;
  totalRecords: number;
  liveCoverage: string;
}

export function KpiStrip({
  totalServices,
  onlineServices,
  totalRecords,
  liveCoverage
}: KpiStripProps) {
  const items = [
    { label: "Connected Services", value: `${onlineServices}/${totalServices}` },
    { label: "Live Coverage", value: liveCoverage },
    { label: "Visible Demo Records", value: totalRecords.toString() },
    { label: "Platform Pattern", value: "React + Spring Boot" }
  ];

  return (
    <section className="kpi-strip">
      {items.map((item) => (
        <article className="kpi-card" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </article>
      ))}
    </section>
  );
}

