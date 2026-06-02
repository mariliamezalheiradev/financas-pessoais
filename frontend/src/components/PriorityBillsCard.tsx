import { Bill, Language } from "../types/finance";
import { formatCurrency } from "../utils/formatters";
import { t } from "../utils/locales";

interface PriorityBillsCardProps {
  bills: Bill[];
  language: Language;
}

export function PriorityBillsCard({ bills, language }: PriorityBillsCardProps) {
  const text = t(language);
  const pending = bills.filter((bill) => !bill.paid);
  const total = pending.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <article className="priority-panel panel" id="prioridade">
      <span>{text.pendingPriority}</span>
      <h2>{text.pendingTotal}</h2>
      <strong>{formatCurrency(total, language)}</strong>
      <p className="muted">
        {language === "pt"
          ? "Valor total das contas cadastradas que ainda não foram marcadas como pagas."
          : "Total amount of registered bills that have not been marked as paid yet."}
      </p>
    </article>
  );
}
