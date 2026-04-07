import React from 'react';
import { Moon, Sun, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { darkMode, toggleDarkMode, transactions } = useApp();

  const exportCSV = () => {
    const headers = 'ID,Title,Amount,Type,Category,Date\n';
    const rows = transactions.map(t =>
      `${t.id},"${t.title}",${t.amount},${t.type},${t.category},${t.date}`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finova-transactions.csv';
    a.click();
  };

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        <button className="icon-btn" onClick={exportCSV} title="Export CSV">
          <Download size={18} />
        </button>
        <button className="icon-btn" onClick={toggleDarkMode} title="Toggle Dark Mode">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="avatar">JS</div>
      </div>
    </header>
  );
};
