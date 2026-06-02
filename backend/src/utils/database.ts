import fs from "node:fs/promises";
import path from "node:path";
import { FinanceDatabase } from "../models/finance.models.js";

const databasePath = path.resolve(process.cwd(), "database.json");

const defaultDatabase: FinanceDatabase = {
  users: [],
  sessions: [],
  transactions: [],
  bills: []
};

function normalizeDatabase(data: Partial<FinanceDatabase>): FinanceDatabase {
  return {
    users: data.users ?? [],
    sessions: data.sessions ?? [],
    transactions: data.transactions ?? [],
    bills: data.bills ?? []
  };
}

async function ensureDatabaseFile(): Promise<void> {
  try {
    await fs.access(databasePath);
  } catch {
    await fs.writeFile(databasePath, JSON.stringify(defaultDatabase, null, 2), "utf-8");
  }
}

export async function readDatabase(): Promise<FinanceDatabase> {
  await ensureDatabaseFile();
  const content = await fs.readFile(databasePath, "utf-8");
  return normalizeDatabase(JSON.parse(content) as Partial<FinanceDatabase>);
}

export async function writeDatabase(data: FinanceDatabase): Promise<void> {
  await ensureDatabaseFile();
  await fs.writeFile(databasePath, JSON.stringify(normalizeDatabase(data), null, 2), "utf-8");
}
