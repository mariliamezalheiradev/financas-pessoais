import { Language, User } from "../types/finance";
import { t } from "../utils/locales";

interface HeaderProps {
  user: User;
  language: Language;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleLanguage: () => void;
  onLogout: () => void;
}

export function Header({ user, language, darkMode, onToggleDarkMode, onToggleLanguage, onLogout }: HeaderProps) {
  const text = t(language);

  return (
    <header className="dashboard-header">
      <div>
        <span>{text.monthlyDashboard}</span>
        <h1>{language === "pt" ? `Olá, ${user.name}` : `Hello, ${user.name}`}</h1>
      </div>
      <div className="header-actions">
        <button type="button" onClick={onToggleLanguage}>{text.switchLanguage}</button>
        <button type="button" onClick={onToggleDarkMode}>{darkMode ? text.lightMode : text.darkMode}</button>
        <button type="button" onClick={onLogout}>{text.logout}</button>
      </div>
    </header>
  );
}
