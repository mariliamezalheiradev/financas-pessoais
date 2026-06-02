export type TransactionType = "income" | "expense";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Session {
  token: string;
  userId: string;
}

export interface Transaction {
  id: string;
  userId: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
}

export interface Bill {
  id: string;
  userId: string;
  name: string;
  amount: number;
  category: string;
  dueDate: string;
  paid: boolean;
}

export interface FinanceDatabase {
  users: User[];
  sessions: Session[];
  transactions: Transaction[];
  bills: Bill[];
}
