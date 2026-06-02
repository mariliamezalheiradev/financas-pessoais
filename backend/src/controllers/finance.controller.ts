import { Response } from "express";
import { AuthenticatedRequest, currentUserId } from "../middlewares/auth.middleware.js";
import { TransactionType } from "../models/finance.models.js";
import { readDatabase, writeDatabase } from "../utils/database.js";
import { createId } from "../utils/id.js";

function selectedMonthAndYear(req: AuthenticatedRequest) {
  const now = new Date();
  const month = String(req.query.month ?? now.getMonth() + 1).padStart(2, "0");
  const year = String(req.query.year ?? now.getFullYear());
  return { month, year };
}

function isSameMonth(date: string, month: string, year: string): boolean {
  const [itemYear, itemMonth] = date.split("-");
  return itemYear === year && itemMonth === month;
}

export async function getSummary(req: AuthenticatedRequest, res: Response) {
  const db = await readDatabase();
  const userId = currentUserId(req);
  const { month, year } = selectedMonthAndYear(req);

  const monthTransactions = db.transactions.filter(
    (transaction) => transaction.userId === userId && isSameMonth(transaction.date, month, year)
  );

  const income = monthTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = monthTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const pendingBills = db.bills
    .filter((bill) => bill.userId === userId && !bill.paid && isSameMonth(bill.dueDate, month, year))
    .reduce((total, bill) => total + bill.amount, 0);

  return res.json({
    income,
    expense,
    balance: income - expense,
    pendingBills
  });
}

export async function listTransactions(req: AuthenticatedRequest, res: Response) {
  const db = await readDatabase();
  const userId = currentUserId(req);
  const transactions = db.transactions
    .filter((transaction) => transaction.userId === userId)
    .sort((a, b) => b.date.localeCompare(a.date));

  return res.json(transactions);
}

export async function createTransaction(req: AuthenticatedRequest, res: Response) {
  const db = await readDatabase();
  const userId = currentUserId(req);
  const { description, amount, type, category, date } = req.body as {
    description?: string;
    amount?: number;
    type?: TransactionType;
    category?: string;
    date?: string;
  };

  if (!description || !amount || !type || !category || !date) {
    return res.status(400).json({ message: "Preencha todos os campos da transação." });
  }

  if (!["income", "expense"].includes(type)) {
    return res.status(400).json({ message: "Tipo de transação inválido." });
  }

  const transaction = {
    id: createId(),
    userId,
    description: description.trim(),
    amount: Number(amount),
    type,
    category: category.trim(),
    date
  };

  db.transactions.push(transaction);
  await writeDatabase(db);

  return res.status(201).json(transaction);
}

export async function listBills(req: AuthenticatedRequest, res: Response) {
  const db = await readDatabase();
  const userId = currentUserId(req);
  const bills = db.bills
    .filter((bill) => bill.userId === userId)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return res.json(bills);
}

export async function createBill(req: AuthenticatedRequest, res: Response) {
  const db = await readDatabase();
  const userId = currentUserId(req);
  const { name, amount, category, dueDate } = req.body as {
    name?: string;
    amount?: number;
    category?: string;
    dueDate?: string;
  };

  if (!name || !amount || !category || !dueDate) {
    return res.status(400).json({ message: "Preencha todos os campos da conta." });
  }

  const bill = {
    id: createId(),
    userId,
    name: name.trim(),
    amount: Number(amount),
    category: category.trim(),
    dueDate,
    paid: false
  };

  db.bills.push(bill);
  await writeDatabase(db);

  return res.status(201).json(bill);
}

export async function toggleBillPaid(req: AuthenticatedRequest, res: Response) {
  const db = await readDatabase();
  const userId = currentUserId(req);
  const { id } = req.params;
  const bill = db.bills.find((item) => item.id === id && item.userId === userId);

  if (!bill) {
    return res.status(404).json({ message: "Conta não encontrada." });
  }

  bill.paid = !bill.paid;
  await writeDatabase(db);

  return res.json(bill);
}
