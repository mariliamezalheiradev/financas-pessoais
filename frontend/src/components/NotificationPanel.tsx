import { Bill, Language } from "../types/finance";
import { daysUntil, formatCurrency, formatDate } from "../utils/formatters";
import { t } from "../utils/locales";

interface NotificationPanelProps {
  bills: Bill[];
  language: Language;
}

export function NotificationPanel({ bills, language }: NotificationPanelProps) {
  const text = t(language);
  const dueBills = bills.filter((bill) => {
    const due = daysUntil(bill.dueDate);
    return !bill.paid && due >= 0 && due <= 2;
  });

  return (
    <section className="alert-panel panel">
      <span>{text.alerts}</span>
      <h2>{text.alertTitle}</h2>
      {dueBills.length === 0 ? (
        <p className="muted">{text.noAlerts}</p>
      ) : (
        <div className="alert-list">
          {dueBills.map((bill) => (
            <div className="alert-item" key={bill.id}>
              <div>
                <strong>{bill.name}</strong>
                <span>{text.dueIn} {daysUntil(bill.dueDate)} {text.days}</span>
              </div>
              <div>
                <strong>{formatCurrency(bill.amount, language)}</strong>
                <span>{formatDate(bill.dueDate, language)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
