import { Router } from "express";
import {
  createBill,
  createTransaction,
  getSummary,
  listBills,
  listTransactions,
  toggleBillPaid
} from "../controllers/finance.controller.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

export const financeRoutes = Router();

financeRoutes.use(ensureAuthenticated);
financeRoutes.get("/summary", getSummary);
financeRoutes.get("/transactions", listTransactions);
financeRoutes.post("/transactions", createTransaction);
financeRoutes.get("/bills", listBills);
financeRoutes.post("/bills", createBill);
financeRoutes.patch("/bills/:id/toggle-paid", toggleBillPaid);
