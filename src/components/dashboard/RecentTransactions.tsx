import React from 'react';
import { useApp } from '../../context/AppContext';
import { categoryColors } from '../../data/mockData';

export const RecentTransactions: React.FC = () => {
  const { transactions } = useApp();
  const recent = transactions.slice(0, 5);

  return (
    <div className="card">
      <h2 className="card-title">Recent Transactions</h2>
      <div className="tx-list">
        {recent.map(tx => (
          <div key={tx.id} className="tx-item">
            <div
              className="tx-dot"
              style={{ background: categoryColors[tx.category] || '#6b7280' }}
            />
            <div className="tx-info">
              <span className="tx-title">{tx.title}</span>
              <span className="tx-cat">{tx.category}</span>
            </div>
            <div className="tx-date">{tx.date}</div>
            <div className={`tx-amount ${tx.type}`}>
              {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
