import { Bill, Summary, Transaction, User } from "../types/finance";

const API_BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3333"}/api`;
const TOKEN_KEY = "finance-token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Erro na requisição.");
  }

  return data as T;
}

export async function registerUser(payload: { name: string; email: string; password: string }) {
  return request<{ token: string; user: User }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function loginUser(payload: { email: string; password: string }) {
  return request<{ token: string; user: User }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function getMe() {
  return request<{ user: User }>("/auth/me");
}

export async function getSummary() {
  return request<Summary>("/finance/summary");
}

export async function getTransactions() {
  return request<Transaction[]>("/finance/transactions");
}

export async function createTransaction(payload: Omit<Transaction, "id">) {
  return request<Transaction>("/finance/transactions", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function getBills() {
  return request<Bill[]>("/finance/bills");
}

export async function createBill(payload: Omit<Bill, "id" | "paid">) {
  return request<Bill>("/finance/bills", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function toggleBillPaid(id: string) {
  return request<Bill>(`/finance/bills/${id}/toggle-paid`, {
    method: "PATCH"
  });
}
