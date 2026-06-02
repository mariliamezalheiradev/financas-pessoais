import { NextFunction, Request, Response } from "express";
import { readDatabase } from "../utils/database.js";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export async function ensureAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  const db = await readDatabase();
  const session = db.sessions.find((item) => item.token === token);

  if (!session) {
    return res.status(401).json({ message: "Sessão inválida." });
  }

  req.userId = session.userId;
  return next();
}

export function currentUserId(req: AuthenticatedRequest): string {
  if (!req.userId) {
    throw new Error("Usuário não autenticado.");
  }
  return req.userId;
}
