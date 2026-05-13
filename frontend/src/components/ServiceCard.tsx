import { CSSProperties } from "react";
import { ServiceState } from "../types";

interface ServiceCardProps {
  item: ServiceState;
  active: boolean;
  onSelect: (key: string) => void;
}

export function ServiceCard({ item, active, onSelect }: ServiceCardProps) {
  const style = { "--accent": item.definition.accent } as CSSProperties;

  return (
    <button
      className={`service-card ${active ? "active" : ""}`}
      onClick={() => onSelect(item.definition.key)}
      style={style}
      type="button"
    >
      <div className="service-card__top">
        <span className={`status-badge status-badge--${item.status}`}>{item.health}</span>
        <small>{item.definition.baseUrl}</small>
      </div>
      <h3>{item.definition.title}</h3>
      <p>{item.definition.subtitle}</p>
      <div className="service-card__tags">
        {item.definition.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </button>
  );
}

