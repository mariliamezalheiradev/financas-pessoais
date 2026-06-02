const STORAGE_KEYS = {
  users: "fp_users_vanilla",
  session: "fp_session_vanilla",
  settings: "fp_settings_vanilla"
};

const translations = {
  pt: {
    appName: "Finanças Pessoais",
    heroTitle: "Controle seu mês com clareza",
    panel: "Painel financeiro",
    access: "Acesso",
    loginTitle: "Entrar na conta",
    registerTitle: "Criar cadastro",
    login: "Login",
    register: "Cadastrar",
    name: "Nome",
    email: "E-mail",
    password: "Senha",
    enter: "Entrar",
    createAccount: "Criar conta",
    authHelp: "Organize suas entradas, saídas e contas a pagar de forma simples.",
    monthlyDashboard: "Dashboard mensal",
    incoming: "Entrou no mês",
    outgoing: "Saiu no mês",
    currentBalance: "Saldo atual",
    pendingTotal: "Total em aberto",
    pendingPriority: "Prioridade: contas em aberto",
    pendingBills: "Contas pendentes",
    transactionForm: "Adicionar transação",
    billForm: "Adicionar conta a pagar",
    description: "Descrição",
    amount: "Valor",
    type: "Tipo",
    income: "Entrada",
    expense: "Saída",
    category: "Categoria",
    date: "Data",
    saveTransaction: "Salvar transação",
    billName: "Nome da conta",
    dueDate: "Vencimento",
    saveBill: "Salvar conta",
    history: "Histórico",
    latestTransactions: "Últimas transações",
    bills: "Contas cadastradas",
    markPaid: "Marcar paga",
    markPending: "Marcar pendente",
    paid: "Paga",
    pending: "Pendente",
    alerts: "Alertas",
    noAlerts: "Nenhuma conta vencendo nos próximos 2 dias.",
    alertTitle: "Contas próximas do vencimento",
    dueIn: "vence em",
    days: "dia(s)",
    overview: "Resumo",
    records: "Cadastros",
    darkMode: "Modo escuro",
    lightMode: "Modo claro",
    logout: "Sair",
    switchLanguage: "English",
    noTransactions: "Nenhuma transação cadastrada.",
    noBills: "Nenhuma conta cadastrada.",
    hello: "Olá",
    delete: "Excluir",
    action: "Ação",
    invalidLogin: "E-mail ou senha incorretos.",
    userExists: "Este e-mail já está cadastrado.",
    shortPassword: "A senha precisa ter pelo menos 6 caracteres.",
    requiredName: "Informe seu nome para criar a conta.",
    alertFloating: "conta(s) vencendo em até 2 dias.",
    overdue: "vencida há",
    today: "vence hoje"
  },
  en: {
    appName: "Personal Finance",
    heroTitle: "Manage your month with clarity",
    panel: "Financial dashboard",
    access: "Access",
    loginTitle: "Sign in",
    registerTitle: "Create account",
    login: "Login",
    register: "Register",
    name: "Name",
    email: "Email",
    password: "Password",
    enter: "Sign in",
    createAccount: "Create account",
    authHelp: "Organize your income, expenses and bills in a simple way.",
    monthlyDashboard: "Monthly dashboard",
    incoming: "Monthly income",
    outgoing: "Monthly expenses",
    currentBalance: "Current balance",
    pendingTotal: "Outstanding total",
    pendingPriority: "Priority: outstanding bills",
    pendingBills: "Pending bills",
    transactionForm: "Add transaction",
    billForm: "Add bill",
    description: "Description",
    amount: "Amount",
    type: "Type",
    income: "Income",
    expense: "Expense",
    category: "Category",
    date: "Date",
    saveTransaction: "Save transaction",
    billName: "Bill name",
    dueDate: "Due date",
    saveBill: "Save bill",
    history: "History",
    latestTransactions: "Latest transactions",
    bills: "Registered bills",
    markPaid: "Mark as paid",
    markPending: "Mark as pending",
    paid: "Paid",
    pending: "Pending",
    alerts: "Alerts",
    noAlerts: "No bills due in the next 2 days.",
    alertTitle: "Bills due soon",
    dueIn: "due in",
    days: "day(s)",
    overview: "Overview",
    records: "Records",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    logout: "Logout",
    switchLanguage: "Português",
    noTransactions: "No transactions registered.",
    noBills: "No bills registered.",
    hello: "Hello",
    delete: "Delete",
    action: "Action",
    invalidLogin: "Incorrect email or password.",
    userExists: "This email is already registered.",
    shortPassword: "Password must be at least 6 characters.",
    requiredName: "Enter your name to create the account.",
    alertFloating: "bill(s) due within 2 days.",
    overdue: "overdue by",
    today: "due today"
  }
};

let state = {
  language: "pt",
  darkMode: true,
  authMode: "login",
  currentUser: null,
  transactions: [],
  bills: []
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const text = () => translations[state.language];

function getJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function getUserDataKey(type) {
  return `fp_${type}_${state.currentUser.email}`;
}

function saveCurrentData() {
  if (!state.currentUser) return;
  setJSON(getUserDataKey("transactions"), state.transactions);
  setJSON(getUserDataKey("bills"), state.bills);
}

function loadCurrentData() {
  if (!state.currentUser) return;
  state.transactions = getJSON(getUserDataKey("transactions"), []);
  state.bills = getJSON(getUserDataKey("bills"), []);
}

function formatCurrency(value) {
  return value.toLocaleString(state.language === "pt" ? "pt-BR" : "en-US", {
    style: "currency",
    currency: state.language === "pt" ? "BRL" : "USD"
  });
}

function formatDate(isoDate) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return state.language === "pt" ? `${day}/${month}/${year}` : `${month}/${day}/${year}`;
}

function daysUntil(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${date}T00:00:00`);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function dueText(date) {
  const days = daysUntil(date);
  if (days < 0) return `${text().overdue} ${Math.abs(days)} ${text().days}`;
  if (days === 0) return text().today;
  return `${text().dueIn} ${days} ${text().days}`;
}

function saveSettings() {
  setJSON(STORAGE_KEYS.settings, {
    language: state.language,
    darkMode: state.darkMode
  });
}

function applySettings() {
  document.documentElement.classList.toggle("dark", state.darkMode);
  document.documentElement.lang = state.language === "pt" ? "pt-BR" : "en-US";
  saveSettings();
}

function translatePage() {
  const t = text();
  $$('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (t[key]) element.textContent = t[key];
  });

  $("#loginTab").textContent = t.login;
  $("#registerTab").textContent = t.register;
  $("#authTitle").textContent = state.authMode === "login" ? t.loginTitle : t.registerTitle;
  $("#authSubmit").textContent = state.authMode === "login" ? t.enter : t.createAccount;

  $("#authLanguageButton").textContent = t.switchLanguage;
  $("#languageButton").textContent = t.switchLanguage;
  $("#authThemeButton").textContent = state.darkMode ? t.lightMode : t.darkMode;
  $("#themeButton").textContent = state.darkMode ? t.lightMode : t.darkMode;
  $("#logoutButton").textContent = t.logout;
  $("#priorityTitle").textContent = t.pendingBills;

  if (state.currentUser) {
    $("#welcomeTitle").textContent = `${t.hello}, ${state.currentUser.name}!`;
  }
}

function setAuthMode(mode) {
  state.authMode = mode;
  $("#loginTab").classList.toggle("active", mode === "login");
  $("#registerTab").classList.toggle("active", mode === "register");
  $("#nameField").classList.toggle("hidden", mode !== "register");
  $("#nameInput").required = mode === "register";
  hideAuthError();
  translatePage();
}

function showAuthError(message) {
  const box = $("#authError");
  box.textContent = message;
  box.classList.remove("hidden");
}

function hideAuthError() {
  $("#authError").classList.add("hidden");
}

function handleAuthSubmit(event) {
  event.preventDefault();
  hideAuthError();

  const users = getJSON(STORAGE_KEYS.users, []);
  const name = $("#nameInput").value.trim();
  const email = $("#emailInput").value.trim().toLowerCase();
  const password = $("#passwordInput").value;

  if (password.length < 6) {
    showAuthError(text().shortPassword);
    return;
  }

  if (state.authMode === "register") {
    if (!name) {
      showAuthError(text().requiredName);
      return;
    }

    if (users.some((user) => user.email === email)) {
      showAuthError(text().userExists);
      return;
    }

    const newUser = { id: makeId(), name, email, password };
    users.push(newUser);
    setJSON(STORAGE_KEYS.users, users);
    login(newUser);
    return;
  }

  const foundUser = users.find((user) => user.email === email && user.password === password);
  if (!foundUser) {
    showAuthError(text().invalidLogin);
    return;
  }

  login(foundUser);
}

function login(user) {
  state.currentUser = { id: user.id, name: user.name, email: user.email };
  setJSON(STORAGE_KEYS.session, state.currentUser);
  loadCurrentData();
  $("#authPage").classList.add("hidden");
  $("#dashboardPage").classList.remove("hidden");
  translatePage();
  renderDashboard();
}

function logout() {
  state.currentUser = null;
  state.transactions = [];
  state.bills = [];
  localStorage.removeItem(STORAGE_KEYS.session);
  $("#dashboardPage").classList.add("hidden");
  $("#authPage").classList.remove("hidden");
  $("#authForm").reset();
}

function getSummary() {
  const income = state.transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + Number(item.amount), 0);

  const expense = state.transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + Number(item.amount), 0);

  const pendingBills = state.bills
    .filter((bill) => !bill.paid)
    .reduce((total, bill) => total + Number(bill.amount), 0);

  return { income, expense, balance: income - expense, pendingBills };
}

function renderSummary() {
  const summary = getSummary();
  $("#incomeTotal").textContent = formatCurrency(summary.income);
  $("#expenseTotal").textContent = formatCurrency(summary.expense);
  $("#balanceTotal").textContent = formatCurrency(summary.balance);
  $("#pendingTotal").textContent = formatCurrency(summary.pendingBills);
}

function renderPriorityBills() {
  const container = $("#priorityBills");
  const pending = state.bills
    .filter((bill) => !bill.paid)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  if (pending.length === 0) {
    container.innerHTML = `<p class="muted">${text().noBills}</p>`;
    return;
  }

  container.innerHTML = pending.map((bill) => `
    <div class="priority-item">
      <div>
        <strong>${escapeHTML(bill.name)}</strong>
        <span>${formatCurrency(Number(bill.amount))} • ${escapeHTML(bill.category)} • ${dueText(bill.dueDate)}</span>
      </div>
      <button class="bill-action" data-action="pay-bill" data-id="${bill.id}">${text().markPaid}</button>
    </div>
  `).join("");
}

function renderAlerts() {
  const alerts = state.bills
    .filter((bill) => !bill.paid && daysUntil(bill.dueDate) >= 0 && daysUntil(bill.dueDate) <= 2)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const alertsList = $("#alertsList");
  const floatingAlert = $("#floatingAlert");

  if (alerts.length === 0) {
    alertsList.innerHTML = `<p class="muted">${text().noAlerts}</p>`;
    floatingAlert.classList.add("hidden");
    return;
  }

  alertsList.innerHTML = alerts.map((bill) => `
    <div class="alert-item">
      <div>
        <strong>${escapeHTML(bill.name)}</strong>
        <span>${formatCurrency(Number(bill.amount))} • ${formatDate(bill.dueDate)} • ${dueText(bill.dueDate)}</span>
      </div>
      <button class="bill-action" data-action="pay-bill" data-id="${bill.id}">${text().markPaid}</button>
    </div>
  `).join("");

  floatingAlert.textContent = `${alerts.length} ${text().alertFloating}`;
  floatingAlert.classList.remove("hidden");
}

function renderTransactions() {
  const table = $("#transactionsTable");
  const noTransactions = $("#noTransactions");
  const sorted = [...state.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  noTransactions.classList.toggle("hidden", sorted.length > 0);

  table.innerHTML = sorted.map((transaction) => `
    <tr>
      <td>${escapeHTML(transaction.description)}</td>
      <td>${formatCurrency(Number(transaction.amount))}</td>
      <td>${transaction.type === "income" ? text().income : text().expense}</td>
      <td>${escapeHTML(transaction.category)}</td>
      <td>${formatDate(transaction.date)}</td>
      <td><button class="delete-button" data-action="delete-transaction" data-id="${transaction.id}">${text().delete}</button></td>
    </tr>
  `).join("");
}

function renderBills() {
  const table = $("#billsTable");
  const noBills = $("#noBills");
  const sorted = [...state.bills].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  noBills.classList.toggle("hidden", sorted.length > 0);

  table.innerHTML = sorted.map((bill) => `
    <tr>
      <td>${escapeHTML(bill.name)}</td>
      <td>${formatCurrency(Number(bill.amount))}</td>
      <td>${escapeHTML(bill.category)}</td>
      <td>${formatDate(bill.dueDate)}</td>
      <td class="${bill.paid ? "status-paid" : "status-pending"}">${bill.paid ? text().paid : text().pending}</td>
      <td class="actions-cell">
        <button class="bill-action" data-action="toggle-bill" data-id="${bill.id}">${bill.paid ? text().markPending : text().markPaid}</button>
        <button class="delete-button" data-action="delete-bill" data-id="${bill.id}">${text().delete}</button>
      </td>
    </tr>
  `).join("");
}

function renderDashboard() {
  translatePage();
  renderSummary();
  renderPriorityBills();
  renderAlerts();
  renderTransactions();
  renderBills();
}

function handleTransactionSubmit(event) {
  event.preventDefault();
  state.transactions.push({
    id: makeId(),
    description: $("#transactionDescription").value.trim(),
    amount: Number($("#transactionAmount").value),
    type: $("#transactionType").value,
    category: $("#transactionCategory").value.trim(),
    date: $("#transactionDate").value
  });
  saveCurrentData();
  event.target.reset();
  $("#transactionDate").value = todayISO();
  renderDashboard();
}

function handleBillSubmit(event) {
  event.preventDefault();
  state.bills.push({
    id: makeId(),
    name: $("#billName").value.trim(),
    amount: Number($("#billAmount").value),
    category: $("#billCategory").value.trim(),
    dueDate: $("#billDueDate").value,
    paid: false
  });
  saveCurrentData();
  event.target.reset();
  $("#billDueDate").value = todayISO();
  renderDashboard();
  playAlertSoundIfNeeded();
}

function handleDashboardClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id;

  if (action === "delete-transaction") {
    state.transactions = state.transactions.filter((item) => item.id !== id);
  }

  if (action === "delete-bill") {
    state.bills = state.bills.filter((item) => item.id !== id);
  }

  if (action === "toggle-bill" || action === "pay-bill") {
    state.bills = state.bills.map((bill) => {
      if (bill.id !== id) return bill;
      return { ...bill, paid: action === "pay-bill" ? true : !bill.paid };
    });
  }

  saveCurrentData();
  renderDashboard();
}

function toggleLanguage() {
  state.language = state.language === "pt" ? "en" : "pt";
  applySettings();
  renderDashboard();
}

function toggleTheme() {
  state.darkMode = !state.darkMode;
  applySettings();
  translatePage();
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function playAlertSoundIfNeeded() {
  const urgent = state.bills.some((bill) => !bill.paid && daysUntil(bill.dueDate) >= 0 && daysUntil(bill.dueDate) <= 2);
  if (!urgent) return;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.type = "sine";
    oscillator.frequency.value = 880;
    gain.gain.value = 0.03;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.25);
    setTimeout(() => audioContext.close(), 400);
  } catch {
    // Alguns navegadores bloqueiam som automático. O alerta visual continua funcionando.
  }
}

function init() {
  const settings = getJSON(STORAGE_KEYS.settings, {});
  state.language = settings.language || "pt";
  state.darkMode = settings.darkMode ?? true;

  applySettings();

  $("#loginTab").addEventListener("click", () => setAuthMode("login"));
  $("#registerTab").addEventListener("click", () => setAuthMode("register"));
  $("#authForm").addEventListener("submit", handleAuthSubmit);
  $("#transactionForm").addEventListener("submit", handleTransactionSubmit);
  $("#billForm").addEventListener("submit", handleBillSubmit);
  $("#dashboardPage").addEventListener("click", handleDashboardClick);

  $("#authLanguageButton").addEventListener("click", toggleLanguage);
  $("#languageButton").addEventListener("click", toggleLanguage);
  $("#authThemeButton").addEventListener("click", toggleTheme);
  $("#themeButton").addEventListener("click", toggleTheme);
  $("#logoutButton").addEventListener("click", logout);

  $("#transactionDate").value = todayISO();
  $("#billDueDate").value = todayISO();

  const session = getJSON(STORAGE_KEYS.session, null);
  if (session) {
    login(session);
  } else {
    setAuthMode("login");
    translatePage();
  }
}

document.addEventListener("DOMContentLoaded", init);
