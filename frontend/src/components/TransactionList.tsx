import { Language, Transaction } from "../types/finance";
import { formatCurrency, formatDate } from "../utils/formatters";
import { t } from "../utils/locales";

interface TransactionListProps {
  transactions: Transaction[];
  language: Language;
}

export function TransactionList({ transactions, language }: TransactionListProps) {
  const text = t(language);

  return (
    <article className="list-panel panel">
      <span>{text.history}</span>
      <h2>{text.latestTransactions}</h2>
      {transactions.length === 0 ? (
        <p className="muted">{text.noTransactions}</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{text.description}</th>
                <th>{text.amount}</th>
                <th>{text.category}</th>
                <th>{text.date}</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>{formatCurrency(transaction.amount, language)}</td>
                  <td>{transaction.category}</td>
                  <td>{formatDate(transaction.date, language)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}
