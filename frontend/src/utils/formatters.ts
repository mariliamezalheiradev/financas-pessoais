import { Language } from "../types/finance";

export function formatCurrency(value: number, language: Language): string {
  return value.toLocaleString(language === "pt" ? "pt-BR" : "en-US", {
    style: "currency",
    currency: language === "pt" ? "BRL" : "USD"
  });
}

export function formatDate(isoDate: string, language: Language): string {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");

  if (!year || !month || !day) return isoDate;

  if (language === "pt") {
    return `${day}/${month}/${year}`;
  }

  return `${month}/${day}/${year}`;
}

export function normalizeDateInput(value: string, language: Language): string {
  const clean = value.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    return clean;
  }

  if (language === "pt") {
    const match = clean.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return clean;
    const [, day, month, year] = match;
    return `${year}-${month}-${day}`;
  }

  const match = clean.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return clean;
  const [, month, day, year] = match;
  return `${year}-${month}-${day}`;
}

export function toInputDate(isoDate: string, language: Language): string {
  return formatDate(isoDate, language);
}

export function daysUntil(date: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${date}T00:00:00`);
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
