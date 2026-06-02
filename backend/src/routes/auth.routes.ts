import { Router } from "express";
import { login, me, register } from "../controllers/auth.controller.js";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/me", me);
