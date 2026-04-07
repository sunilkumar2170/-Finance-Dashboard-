import React from 'react';
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SummaryCards: React.FC = () => {
  const { transactions } = useApp();

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expenses;
  const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;

  const cards = [
    { label: 'Total Balance', value: `$${balance.toLocaleString()}`, icon: Wallet, color: 'card-blue', change: '+2.5%' },
    { label: 'Total Income', value: `$${income.toLocaleString()}`, icon: TrendingUp, color: 'card-green', change: '+12%' },
    { label: 'Total Expenses', value: `$${expenses.toLocaleString()}`, icon: TrendingDown, color: 'card-red', change: '-3.1%' },
    { label: 'Savings Rate', value: `${savingsRate}%`, icon: PiggyBank, color: 'card-purple', change: '+5%' },
  ];

  return (
    <div className="summary-cards">
      {cards.map(({ label, value, icon: Icon, color, change }) => (
        <div key={label} className={`card summary-card ${color}`}>
          <div className="card-top">
            <div className="card-icon"><Icon size={20} /></div>
            <span className="card-change">{change}</span>
          </div>
          <div className="card-value">{value}</div>
          <div className="card-label">{label}</div>
        </div>
      ))}
    </div>
  );
};
