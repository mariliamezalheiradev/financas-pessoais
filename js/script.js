const STORAGE_KEYS = {
  users: "fp_users_vanilla",
  session: "fp_session_vanilla",
  settings: "fp_settings_vanilla",
  alertHistory: "fp_alert_history_vanilla"
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
    noAlerts: "Nenhuma conta vencida ou vencendo nos próximos 2 dias.",
    alertTitle: "Contas próximas do vencimento",
    dueIn: "vence em",
    days: "dia(s)",
    overview: "Resumo",
    records: "Cadastros",
    transactionsMenu: "Transações",
    accountsMenu: "Contas",
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
    alertFloating: "alerta(s) de contas.",
    automaticAlertMessage: "Você tem conta faltando 2 dias ou 1 dia para vencer.",
    overdue: "vencida há",
    today: "vence hoje",
    alertNotificationTitle: "Atenção!",
    alertNotificationMessage: "Você tem conta vencida ou vencendo em até 2 dias.",
    close: "Fechar"
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
    noAlerts: "No overdue bills or bills due in the next 2 days.",
    alertTitle: "Bills due soon",
    dueIn: "due in",
    days: "day(s)",
    overview: "Overview",
    records: "Records",
    transactionsMenu: "Transactions",
    accountsMenu: "Bills",
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
    alertFloating: "bill alert(s).",
    automaticAlertMessage: "You have a bill due in 2 days or 1 day.",
    overdue: "overdue by",
    today: "due today",
    alertNotificationTitle: "Attention!",
    alertNotificationMessage: "You have a bill overdue or due within 2 days.",
    close: "Close"
  }
};

let state = {
  language: "pt",
  darkMode: true,
  authMode: "login",
  currentUser: null,
  transactions: [],
  bills: [],
  currentPage: "resumo",
  lastAlertSignature: ""
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

function isoToBRDate(isoDate) {
  if (!isoDate) return "";

  if (isoDate.includes("/")) {
    return isoDate;
  }

  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;

  return `${day}/${month}/${year}`;
}

function brDateToISO(brDate) {
  if (!brDate) return "";

  if (brDate.includes("-")) {
    return brDate;
  }

  const [day, month, year] = brDate.split("/");
  if (!day || !month || !year) return brDate;

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function todayBR() {
  return isoToBRDate(todayISO());
}

function aplicarMascaraData(input) {
  if (!input) return;

  input.addEventListener("input", () => {
    let valor = input.value.replace(/\D/g, "");

    if (valor.length > 2) {
      valor = valor.slice(0, 2) + "/" + valor.slice(2);
    }

    if (valor.length > 5) {
      valor = valor.slice(0, 5) + "/" + valor.slice(5, 9);
    }

    input.value = valor;
  });
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

function formatDate(dateValue) {
  if (!dateValue) return "";

  const isoDate = brDateToISO(dateValue);
  const [year, month, day] = isoDate.split("-");

  if (!year || !month || !day) return dateValue;

  return state.language === "pt" ? `${day}/${month}/${year}` : `${month}/${day}/${year}`;
}

function daysUntil(dateValue) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isoDate = brDateToISO(dateValue);
  const target = new Date(`${isoDate}T00:00:00`);

  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function dueText(date) {
  const days = daysUntil(date);

  if (days < 0) return `${text().overdue} ${Math.abs(days)} ${text().days}`;
  if (days === 0) return text().today;

  return `${text().dueIn} ${days} ${text().days}`;
}

function getUrgentBills() {
  return state.bills
    .filter((bill) => !bill.paid && daysUntil(bill.dueDate) <= 2)
    .sort((a, b) => new Date(brDateToISO(a.dueDate)) - new Date(brDateToISO(b.dueDate)));
}


function getAutomaticAlertBills() {
  return state.bills
    .filter((bill) => {
      const days = daysUntil(bill.dueDate);
      return !bill.paid && (days === 2 || days === 1);
    })
    .sort((a, b) => new Date(brDateToISO(a.dueDate)) - new Date(brDateToISO(b.dueDate)));
}

function getTodayAlertKey() {
  if (!state.currentUser) return STORAGE_KEYS.alertHistory;
  return `${STORAGE_KEYS.alertHistory}_${state.currentUser.email}`;
}

function runAutomaticDailyAlerts(force = false) {
  const automaticBills = getAutomaticAlertBills();
  if (automaticBills.length === 0) return;

  const historyKey = getTodayAlertKey();
  const alreadyShown = getJSON(historyKey, []);
  const today = todayISO();

  const pendingAlerts = automaticBills.filter((bill) => {
    const days = daysUntil(bill.dueDate);
    const alertId = `${today}_${bill.id}_${days}`;
    return force || !alreadyShown.includes(alertId);
  });

  if (pendingAlerts.length === 0) return;

  const first = pendingAlerts[0];
  const message = pendingAlerts.length === 1
    ? `${first.name} - ${formatCurrency(Number(first.amount))} - ${formatDate(first.dueDate)} - ${dueText(first.dueDate)}`
    : `${pendingAlerts.length} ${text().alertFloating} ${first.name} - ${formatDate(first.dueDate)} - ${dueText(first.dueDate)}`;

  showAlertNotification(message);
  playAlertSoundIfNeeded(true);

  const newHistory = [
    ...alreadyShown,
    ...pendingAlerts.map((bill) => `${today}_${bill.id}_${daysUntil(bill.dueDate)}`)
  ];

  setJSON(historyKey, [...new Set(newHistory)].slice(-200));
}

function getUrgentAlertMessage(urgentBills = getUrgentBills()) {
  if (urgentBills.length === 0) return "";

  const firstBill = urgentBills[0];
  const firstBillText = `${firstBill.name} - ${formatCurrency(Number(firstBill.amount))} - ${formatDate(firstBill.dueDate)} - ${dueText(firstBill.dueDate)}`;

  if (urgentBills.length === 1) {
    return firstBillText;
  }

  return `${urgentBills.length} ${text().alertFloating} ${firstBillText}`;
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

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
}

function translatePage() {
  const t = text();

  $$("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (t[key]) element.textContent = t[key];
  });

  setText("#loginTab", t.login);
  setText("#registerTab", t.register);
  setText("#authTitle", state.authMode === "login" ? t.loginTitle : t.registerTitle);
  setText("#authSubmit", state.authMode === "login" ? t.enter : t.createAccount);

  setText("#authLanguageButton", t.switchLanguage);
  setText("#languageButton", t.switchLanguage);
  setText("#authThemeButton", state.darkMode ? t.lightMode : t.darkMode);
  setText("#themeButton", state.darkMode ? t.lightMode : t.darkMode);
  setText("#logoutButton", t.logout);
  setText("#priorityTitle", t.pendingBills);

  if (state.currentUser) {
    setText("#welcomeTitle", `${t.hello}, ${state.currentUser.name}!`);
  }
}

function setAuthMode(mode) {
  state.authMode = mode;

  const loginTab = $("#loginTab");
  const registerTab = $("#registerTab");
  const nameField = $("#nameField");
  const nameInput = $("#nameInput");
  const authCard = $(".auth-card");

  if (loginTab) loginTab.classList.toggle("active", mode === "login");
  if (registerTab) registerTab.classList.toggle("active", mode === "register");
  if (nameField) nameField.classList.toggle("hidden", mode !== "register");
  if (nameInput) nameInput.required = mode === "register";

if (authCard) {
  authCard.classList.remove("auth-form-animate");

  setTimeout(() => {
    authCard.classList.add("auth-form-animate");
  }, 10);
}

  hideAuthError();
  translatePage();
}

function showAuthError(message) {
  const box = $("#authError");
  if (!box) return;

  box.textContent = message;
  box.classList.remove("hidden");
}

function hideAuthError() {
  const box = $("#authError");
  if (!box) return;

  box.classList.add("hidden");
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

  const authPage = $("#authPage");
  const dashboardPage = $("#dashboardPage");

  if (authPage) authPage.classList.add("hidden");
  if (dashboardPage) dashboardPage.classList.remove("hidden");

  translatePage();
  setActivePage(getInitialPageFromHash());
  renderDashboard();
  setTimeout(() => runAutomaticDailyAlerts(), 650);
}

function logout() {
  state.currentUser = null;
  state.transactions = [];
  state.bills = [];

  localStorage.removeItem(STORAGE_KEYS.session);

  const dashboardPage = $("#dashboardPage");
  const authPage = $("#authPage");
  const authForm = $("#authForm");

  if (dashboardPage) dashboardPage.classList.add("hidden");
  if (authPage) authPage.classList.remove("hidden");
  if (authForm) authForm.reset();

  setAuthMode("login");
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

  setText("#incomeTotal", formatCurrency(summary.income));
  setText("#expenseTotal", formatCurrency(summary.expense));
  setText("#balanceTotal", formatCurrency(summary.balance));
  setText("#pendingTotal", formatCurrency(summary.pendingBills));
}

function renderPriorityBills() {
  const container = $("#priorityBills");
  if (!container) return;

  const pending = state.bills
    .filter((bill) => !bill.paid)
    .sort((a, b) => new Date(brDateToISO(a.dueDate)) - new Date(brDateToISO(b.dueDate)));

  if (pending.length === 0) {
    container.innerHTML = `<p class="muted">${text().noBills}</p>`;
    return;
  }

  container.innerHTML = pending.map((bill) => {
    return `
      <div class="priority-item">
        <div>
          <strong>${escapeHTML(bill.name)}</strong>
          <span>
            ${formatCurrency(Number(bill.amount))} •
            ${escapeHTML(bill.category)} •
            ${formatDate(bill.dueDate)} •
            ${dueText(bill.dueDate)}
          </span>
        </div>

        <button class="bill-action" data-action="pay-bill" data-id="${bill.id}">
          ${text().markPaid}
        </button>
      </div>
    `;
  }).join("");
}

function renderAlerts() {
  const alerts = getUrgentBills();

  const alertsList = $("#alertsList");
  const floatingAlert = $("#floatingAlert");

  if (!alertsList || !floatingAlert) return;

  if (alerts.length === 0) {
    alertsList.innerHTML = `<p class="muted">${text().noAlerts}</p>`;
    floatingAlert.classList.add("hidden");
    updateAlertBadge(0);
    return;
  }

  alertsList.innerHTML = alerts.map((bill) => `
    <div class="alert-item">
      <div>
        <strong>${escapeHTML(bill.name)}</strong>
        <span>${formatCurrency(Number(bill.amount))} • ${formatDate(bill.dueDate)} • ${dueText(bill.dueDate)}</span>
      </div>

      <button class="bill-action" data-action="pay-bill" data-id="${bill.id}">
        ${text().markPaid}
      </button>
    </div>
  `).join("");

  floatingAlert.textContent = `${alerts.length} ${text().alertFloating}`;
  floatingAlert.classList.remove("hidden");
  updateAlertBadge(alerts.length);
}

function updateAlertBadge(count = getUrgentBills().length) {
  const badge = $("#alertBadge");
  if (!badge) return;

  badge.textContent = count > 99 ? "99+" : String(count);
  badge.classList.toggle("hidden", count === 0);
}

function renderTransactions() {
  const table = $("#transactionsTable");
  const noTransactions = $("#noTransactions");

  if (!table || !noTransactions) return;

  const sorted = [...state.transactions].sort((a, b) => {
    return new Date(brDateToISO(b.date)) - new Date(brDateToISO(a.date));
  });

  noTransactions.classList.toggle("hidden", sorted.length > 0);

  table.innerHTML = sorted.map((transaction) => `
    <tr>
      <td>${escapeHTML(transaction.description)}</td>
      <td>${formatCurrency(Number(transaction.amount))}</td>
      <td>${transaction.type === "income" ? text().income : text().expense}</td>
      <td>${escapeHTML(transaction.category)}</td>
      <td>${formatDate(transaction.date)}</td>
      <td>
        <button class="delete-button" data-action="delete-transaction" data-id="${transaction.id}">
          ${text().delete}
        </button>
      </td>
    </tr>
  `).join("");
}

function renderBills() {
  const table = $("#billsTable");
  const noBills = $("#noBills");

  if (!table || !noBills) return;

  const sorted = [...state.bills].sort((a, b) => {
    return new Date(brDateToISO(a.dueDate)) - new Date(brDateToISO(b.dueDate));
  });

  noBills.classList.toggle("hidden", sorted.length > 0);

  table.innerHTML = sorted.map((bill) => `
    <tr>
      <td>${escapeHTML(bill.name)}</td>
      <td>${formatCurrency(Number(bill.amount))}</td>
      <td>${escapeHTML(bill.category)}</td>
      <td>${formatDate(bill.dueDate)}</td>
      <td class="${bill.paid ? "status-paid" : "status-pending"}">
        ${bill.paid ? text().paid : text().pending}
      </td>
      <td class="actions-cell">
        <button class="bill-action" data-action="toggle-bill" data-id="${bill.id}">
          ${bill.paid ? text().markPending : text().markPaid}
        </button>

        <button class="delete-button" data-action="delete-bill" data-id="${bill.id}">
          ${text().delete}
        </button>
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
    date: brDateToISO($("#transactionDate").value)
  });

  saveCurrentData();

  event.target.reset();

  const transactionDate = $("#transactionDate");
  if (transactionDate) transactionDate.value = todayBR();

  renderDashboard();
}

function handleBillSubmit(event) {
  event.preventDefault();

  state.bills.push({
    id: makeId(),
    name: $("#billName").value.trim(),
    amount: Number($("#billAmount").value),
    category: $("#billCategory").value.trim(),
    dueDate: brDateToISO($("#billDueDate").value),
    paid: false
  });

  saveCurrentData();

  event.target.reset();

  const billDueDate = $("#billDueDate");
  if (billDueDate) billDueDate.value = todayBR();

  renderDashboard();

  runAutomaticDailyAlerts(true);
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


function setActivePage(page) {
  const validPages = ["resumo", "alertas", "cadastros", "transacoes", "contas"];
  const nextPage = validPages.includes(page) ? page : "resumo";

  state.currentPage = nextPage;

  $$('[data-page-section]').forEach((section) => {
    section.classList.toggle('active-page', section.dataset.pageSection === nextPage);
  });

  $$('[data-page-link]').forEach((link) => {
    link.classList.toggle('active', link.dataset.pageLink === nextPage);
  });

  if (window.location.hash !== `#${nextPage}`) {
    history.replaceState(null, '', `#${nextPage}`);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getInitialPageFromHash() {
  return window.location.hash.replace('#', '') || 'resumo';
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

function showAlertNotification(message = getUrgentAlertMessage()) {
  if (!message) return;

  const notification = $("#alarmNotification");
  const title = $("#alarmNotificationTitle");
  const textBox = $("#alarmNotificationText");
  const closeButton = $("#alarmNotificationClose");

  if (title) title.textContent = text().alertNotificationTitle;
  if (textBox) textBox.textContent = message;
  if (closeButton) closeButton.textContent = text().close;

  if (notification) {
    notification.classList.remove("hidden");

    window.clearTimeout(notification.dataset.timeoutId);
    const timeoutId = window.setTimeout(() => {
      notification.classList.add("hidden");
    }, 9000);

    notification.dataset.timeoutId = timeoutId;
  }

}

function getAlertSoundDuration(urgentBills = getUrgentBills()) {
  const daysList = urgentBills.map((bill) => daysUntil(bill.dueDate));

  if (daysList.includes(1)) return 3;
  if (daysList.includes(2)) return 3;

  return 0;
}

function playAlertSoundIfNeeded(force = false) {
  const urgentBills = getUrgentBills();
  const duration = getAlertSoundDuration(urgentBills);

  if (urgentBills.length === 0 || duration === 0) return;

  const signature = urgentBills
    .map((bill) => `${bill.id}-${bill.paid}-${bill.dueDate}-${daysUntil(bill.dueDate)}`)
    .join("|");

  if (!force && signature === state.lastAlertSignature) return;

  state.lastAlertSignature = signature;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContextClass();
    const startTime = audioContext.currentTime;
    const endTime = startTime + duration;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(daysUntil(urgentBills[0].dueDate) === 1 ? 980 : 880, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.075, startTime + 0.08);

    for (let time = startTime; time < endTime; time += 0.5) {
      gain.gain.setValueAtTime(0.075, time);
      gain.gain.linearRampToValueAtTime(0.02, time + 0.25);
      gain.gain.linearRampToValueAtTime(0.075, time + 0.5);
    }

    gain.gain.linearRampToValueAtTime(0.001, endTime);

    oscillator.start(startTime);
    oscillator.stop(endTime);

    setTimeout(() => audioContext.close(), (duration * 1000) + 500);
  } catch {
    // Alguns navegadores bloqueiam som automático. O alerta visual continua funcionando.
  }
}

function addClick(selector, callback) {
  const element = $(selector);
  if (element) element.addEventListener("click", callback);
}

function addSubmit(selector, callback) {
  const element = $(selector);
  if (element) element.addEventListener("submit", callback);
}

function init() {
  const settings = getJSON(STORAGE_KEYS.settings, {});

  state.language = settings.language || "pt";
  state.darkMode = settings.darkMode ?? true;

  applySettings();

  addClick("#loginTab", () => setAuthMode("login"));
  addClick("#registerTab", () => setAuthMode("register"));

  addSubmit("#authForm", handleAuthSubmit);
  addSubmit("#transactionForm", handleTransactionSubmit);
  addSubmit("#billForm", handleBillSubmit);

  const dashboardPage = $("#dashboardPage");
  if (dashboardPage) {
    dashboardPage.addEventListener("click", handleDashboardClick);
  }

  $$('[data-page-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      setActivePage(link.dataset.pageLink);
    });
  });

  window.addEventListener('hashchange', () => {
    setActivePage(getInitialPageFromHash());
  });

  addClick("#authLanguageButton", toggleLanguage);
  addClick("#languageButton", toggleLanguage);
  addClick("#authThemeButton", toggleTheme);
  addClick("#themeButton", toggleTheme);
  addClick("#logoutButton", logout);
  addClick("#alarmNotificationClose", () => {
    const notification = $("#alarmNotification");
    if (notification) notification.classList.add("hidden");
  });

  const transactionDate = $("#transactionDate");
  const billDueDate = $("#billDueDate");

  aplicarMascaraData(transactionDate);
  aplicarMascaraData(billDueDate);

  if (transactionDate) transactionDate.value = todayBR();
  if (billDueDate) billDueDate.value = todayBR();

  const session = getJSON(STORAGE_KEYS.session, null);

  if (session) {
    login(session);
  } else {
    setAuthMode("login");
    translatePage();
  }
}

document.addEventListener("DOMContentLoaded", init);