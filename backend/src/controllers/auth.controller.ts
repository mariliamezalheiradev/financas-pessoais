import { Request, Response } from "express";
import { createId } from "../utils/id.js";
import { readDatabase, writeDatabase } from "../utils/database.js";

function sanitizeUser(user: { id: string; name: string; email: string }) {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body as { name?: string; email?: string; password?: string };

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Preencha nome, e-mail e senha." });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." });
  }

  const db = await readDatabase();
  const normalizedEmail = email.trim().toLowerCase();
  const alreadyExists = db.users.some((user) => user.email === normalizedEmail);

  if (alreadyExists) {
    return res.status(409).json({ message: "Este e-mail já está cadastrado." });
  }

  const user = {
    id: createId(),
    name: name.trim(),
    email: normalizedEmail,
    password
  };

  const token = createId();
  db.users.push(user);
  db.sessions.push({ token, userId: user.id });
  await writeDatabase(db);

  return res.status(201).json({ token, user: sanitizeUser(user) });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha e-mail e senha." });
  }

  const db = await readDatabase();
  const user = db.users.find(
    (item) => item.email === email.trim().toLowerCase() && item.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "E-mail ou senha inválidos." });
  }

  const token = createId();
  db.sessions.push({ token, userId: user.id });
  await writeDatabase(db);

  return res.json({ token, user: sanitizeUser(user) });
}

export async function me(req: Request, res: Response) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  const db = await readDatabase();
  const session = db.sessions.find((item) => item.token === token);
  const user = db.users.find((item) => item.id === session?.userId);

  if (!session || !user) {
    return res.status(401).json({ message: "Sessão inválida." });
  }

  return res.json({ user: sanitizeUser(user) });
}
