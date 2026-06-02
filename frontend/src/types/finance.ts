export type Language = "pt" | "en";
export type TransactionType = "income" | "expense";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Summary {
  income: number;
  expense: number;
  balance: number;
  pendingBills: number;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  category: string;
  dueDate: string;
  paid: boolean;
}
