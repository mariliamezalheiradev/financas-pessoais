import { Language } from "../types/finance";
import { t } from "../utils/locales";

interface SidebarProps {
  language: Language;
}

export function Sidebar({ language }: SidebarProps) {
  const text = t(language);

  return (
    <aside className="sidebar panel">
      <div className="sidebar-brand">
        <div className="brand-mark">FP</div>
        <div>
          <strong>{text.appName}</strong>
          <span>{text.panel}</span>
        </div>
      </div>

      <nav className="sidebar-menu" aria-label="Menu principal">
        <a href="#resumo">{text.overview}</a>
        <a href="#prioridade">{text.pendingPriority}</a>
        <a href="#alertas">{text.alerts}</a>
        <a href="#cadastros">{text.records}</a>
        <a href="#historico">{text.history}</a>
      </nav>
    </aside>
  );
}
