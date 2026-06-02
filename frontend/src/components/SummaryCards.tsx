import { Language, Summary } from "../types/finance";
import { formatCurrency } from "../utils/formatters";
import { t } from "../utils/locales";

interface SummaryCardsProps {
  summary: Summary;
  language: Language;
}

export function SummaryCards({ summary, language }: SummaryCardsProps) {
  const text = t(language);

  return (
    <section className="summary-grid">
      <article className="summary-card panel">
        <span>{text.incoming}</span>
        <strong>{formatCurrency(summary.income, language)}</strong>
      </article>
      <article className="summary-card panel">
        <span>{text.outgoing}</span>
        <strong>{formatCurrency(summary.expense, language)}</strong>
      </article>
      <article className="summary-card panel priority-card" id="prioridade">
        <span>{text.pendingTotal}</span>
        <strong>{formatCurrency(summary.pendingBills, language)}</strong>
      </article>
      <article className="summary-card panel">
        <span>{text.currentBalance}</span>
        <strong>{formatCurrency(summary.balance, language)}</strong>
      </article>
    </section>
  );
}
