import { useEffect, useMemo, useState } from "react";
import { AuthScreen } from "./components/AuthScreen";
import { BillForm } from "./components/BillForm";
import { BillsList } from "./components/BillsList";
import { Header } from "./components/Header";
import { NotificationPanel } from "./components/NotificationPanel";
import { PriorityBillsCard } from "./components/PriorityBillsCard";
import { Sidebar } from "./components/Sidebar";
import { SummaryCards } from "./components/SummaryCards";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { clearToken, getBills, getMe, getSummary, getToken, getTransactions } from "./services/api";
import { Bill, Language, Summary, Transaction, User } from "./types/finance";
import { daysUntil } from "./utils/formatters";
import "./styles/global.css";

const emptySummary: Summary = {
  income: 0,
  expense: 0,
  balance: 0,
  pendingBills: 0
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [summary, setSummary] = useState<Summary>(emptySummary);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState<Language>("pt");

  const urgentBills = useMemo(
    () => bills.filter((bill) => !bill.paid && daysUntil(bill.dueDate) >= 0 && daysUntil(bill.dueDate) <= 2),
    [bills]
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en-US";
  }, [darkMode, language]);

  useEffect(() => {
    async function restoreSession() {
      if (!getToken()) return;
      try {
        const response = await getMe();
        setUser(response.user);
      } catch {
        clearToken();
      }
    }

    restoreSession();
  }, []);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  useEffect(() => {
    if (urgentBills.length === 0 || !user) return;

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.type = "sine";
    oscillator.frequency.value = 880;
    gain.gain.value = 0.03;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.25);

    return () => {
      audioContext.close().catch(() => undefined);
    };
  }, [urgentBills.length, user]);

  async function loadData() {
    try {
      setError("");
      const [summaryData, transactionData, billData] = await Promise.all([
        getSummary(),
        getTransactions(),
        getBills()
      ]);
      setSummary(summaryData);
      setTransactions(transactionData);
      setBills(billData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados.");
    }
  }

  function handleLogout() {
    clearToken();
    setUser(null);
    setSummary(emptySummary);
    setTransactions([]);
    setBills([]);
  }

  if (!user) {
    return (
      <AuthScreen
        language={language}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((value) => !value)}
        onToggleLanguage={() => setLanguage((value) => (value === "pt" ? "en" : "pt"))}
        onAuthenticated={setUser}
      />
    );
  }

  return (
    <main className="app-shell">
      <div className="dashboard-layout">
        <Sidebar language={language} />

        <div className="dashboard-main">
          <Header
            user={user}
            language={language}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode((value) => !value)}
            onToggleLanguage={() => setLanguage((value) => (value === "pt" ? "en" : "pt"))}
            onLogout={handleLogout}
          />

          {error && <div className="error-box">{error}</div>}

          {urgentBills.length > 0 && (
            <div className="floating-alert">
              <strong>{language === "pt" ? "Alerta de vencimento" : "Due date alert"}</strong>
              <span>
                {language === "pt"
                  ? `${urgentBills.length} conta(s) vencendo em até 2 dias.`
                  : `${urgentBills.length} bill(s) due within 2 days.`}
              </span>
            </div>
          )}

          <section id="resumo">
            <SummaryCards summary={summary} language={language} />
          </section>

          <section className="priority-section">
            <PriorityBillsCard bills={bills} language={language} />
          </section>

          <section id="alertas">
            <NotificationPanel bills={bills} language={language} />
          </section>

          <section className="forms-grid" id="cadastros">
            <TransactionForm language={language} onCreated={loadData} />
            <BillForm language={language} onCreated={loadData} />
          </section>

          <section className="content-grid" id="historico">
            <TransactionList transactions={transactions} language={language} />
            <BillsList bills={bills} language={language} onUpdated={loadData} />
          </section>
        </div>
      </div>
    </main>
  );
}
