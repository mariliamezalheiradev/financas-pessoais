import { FormEvent, useState } from "react";
import { createBill } from "../services/api";
import { Language } from "../types/finance";
import { normalizeDateInput, toInputDate } from "../utils/formatters";
import { t } from "../utils/locales";

interface BillFormProps {
  language: Language;
  onCreated: () => void;
}

export function BillForm({ language, onCreated }: BillFormProps) {
  const text = t(language);
  const todayIso = new Date().toISOString().slice(0, 10);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState(toInputDate(todayIso, language));

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await createBill({
      userId: "",
      name,
      amount: Number(amount.replace(",", ".")),
      category,
      dueDate: normalizeDateInput(dueDate, language)
    });

    setName("");
    setAmount("");
    setCategory("");
    setDueDate(toInputDate(todayIso, language));
    onCreated();
  }

  return (
    <article className="form-card panel">
      <span>{language === "pt" ? "Contas" : "Bills"}</span>
      <h2>{text.billForm}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>{text.billName}<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
        <label>{text.amount}<input type="number" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} required /></label>
        <label>{text.category}<input value={category} onChange={(event) => setCategory(event.target.value)} required /></label>
        <label>{text.dueDate}<input value={dueDate} placeholder={text.datePlaceholder} onChange={(event) => setDueDate(event.target.value)} required /></label>
        <button className="primary-button" type="submit">{text.saveBill}</button>
      </form>
    </article>
  );
}
