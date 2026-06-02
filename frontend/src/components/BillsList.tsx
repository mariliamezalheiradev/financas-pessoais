import { toggleBillPaid } from "../services/api";
import { Bill, Language } from "../types/finance";
import { daysUntil, formatCurrency, formatDate } from "../utils/formatters";
import { t } from "../utils/locales";

interface BillsListProps {
  bills: Bill[];
  language: Language;
  onUpdated: () => void;
}

export function BillsList({ bills, language, onUpdated }: BillsListProps) {
  const text = t(language);

  async function handleToggle(id: string) {
    await toggleBillPaid(id);
    onUpdated();
  }

  return (
    <article className="list-panel panel">
      <span>{language === "pt" ? "Vencimentos" : "Due dates"}</span>
      <h2>{text.bills}</h2>
      {bills.length === 0 ? (
        <p className="muted">{text.noBills}</p>
      ) : (
        <div className="bill-list">
          {bills.map((bill) => {
            const due = daysUntil(bill.dueDate);
            return (
              <div className={`bill-card ${!bill.paid && due <= 2 && due >= 0 ? "urgent" : ""}`} key={bill.id}>
                <div>
                  <strong>{bill.name}</strong>
                  <span>{bill.category} • {formatDate(bill.dueDate, language)}</span>
                  {!bill.paid && due <= 2 && due >= 0 && <small>{text.alertTitle}</small>}
                </div>
                <div className="bill-value">
                  <strong>{formatCurrency(bill.amount, language)}</strong>
                  <button type="button" onClick={() => handleToggle(bill.id)}>{bill.paid ? text.paid : text.markPaid}</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}
