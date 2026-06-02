import { FormEvent, useState } from "react";
import { createTransaction } from "../services/api";
import { Language, TransactionType } from "../types/finance";
import { normalizeDateInput, toInputDate } from "../utils/formatters";
import { t } from "../utils/locales";

interface TransactionFormProps {
  language: Language;
  onCreated: () => void;
}

export function TransactionForm({ language, onCreated }: TransactionFormProps) {
  const text = t(language);
  const todayIso = new Date().toISOString().slice(0, 10);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(toInputDate(todayIso, language));

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      userId: "",
      description,
      amount: Number(amount.replace(",", ".")),
      type,
      category,
      date: normalizeDateInput(date, language)
    });

    setDescription("");
    setAmount("");
    setCategory("");
    setDate(toInputDate(todayIso, language));
    onCreated();
  }

  return (
    <article className="form-card panel">
      <span>{language === "pt" ? "Manual" : "Manual"}</span>
      <h2>{text.transactionForm}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>{text.description}<input value={description} onChange={(event) => setDescription(event.target.value)} required /></label>
        <label>{text.amount}<input type="number" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} required /></label>
        <label>{text.type}<select value={type} onChange={(event) => setType(event.target.value as TransactionType)}><option value="income">{text.income}</option><option value="expense">{text.expense}</option></select></label>
        <label>{text.category}<input value={category} onChange={(event) => setCategory(event.target.value)} required /></label>
        <label>{text.date}<input value={date} placeholder={text.datePlaceholder} onChange={(event) => setDate(event.target.value)} required /></label>
        <button className="primary-button" type="submit">{text.saveTransaction}</button>
      </form>
    </article>
  );
}
