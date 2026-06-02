import { FormEvent, useState } from "react";
import { Language, User } from "../types/finance";
import { t } from "../utils/locales";
import { loginUser, registerUser, saveToken } from "../services/api";

interface AuthScreenProps {
  language: Language;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleLanguage: () => void;
  onAuthenticated: (user: User) => void;
}

export function AuthScreen({
  language,
  darkMode,
  onToggleDarkMode,
  onToggleLanguage,
  onAuthenticated
}: AuthScreenProps) {
  const text = t(language);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = mode === "register"
        ? await registerUser({ name, email, password })
        : await loginUser({ email, password });

      saveToken(response.token);
      onAuthenticated(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao autenticar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-hero">
        <div className="brand-pill">FP</div>
        <span>{text.appName}</span>
        <h1>{language === "pt" ? "Um painel seguro para controlar seu mês com clareza" : "A secure dashboard to manage your month with clarity"}</h1>
        <p>{text.authHelp}</p>
        <div className="auth-actions-row">
          <button type="button" onClick={onToggleLanguage}>{text.switchLanguage}</button>
          <button type="button" onClick={onToggleDarkMode}>{darkMode ? text.lightMode : text.darkMode}</button>
        </div>
      </section>

      <section className="auth-card panel">
        <div className="auth-header">
          <span>{language === "pt" ? "Acesso" : "Access"}</span>
          <h2>{mode === "login" ? text.loginTitle : text.registerTitle}</h2>
        </div>

        <div className="auth-tabs">
          <button className={mode === "login" ? "active" : ""} type="button" onClick={() => setMode("login")}>{text.login}</button>
          <button className={mode === "register" ? "active" : ""} type="button" onClick={() => setMode("register")}>{text.register}</button>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="form-grid">
          {mode === "register" && (
            <label>
              {text.name}
              <input value={name} onChange={(event) => setName(event.target.value)} required />
            </label>
          )}
          <label>
            {text.email}
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            {text.password}
            <input type="password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "..." : mode === "login" ? text.enter : text.createAccount}
          </button>
        </form>
      </section>
    </main>
  );
}
