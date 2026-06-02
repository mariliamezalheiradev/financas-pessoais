import cors from "cors";
import express from "express";
import { authRoutes } from "./routes/auth.routes.js";
import { financeRoutes } from "./routes/finance.routes.js";

const app = express();
const port = Number(process.env.PORT) || 3333;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  return res.json({ message: "API de finanças pessoais funcionando." });
});

app.use("/api/auth", authRoutes);
app.use("/api/finance", financeRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
