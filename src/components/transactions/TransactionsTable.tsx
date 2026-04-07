import React, { useState, useMemo } from 'react';
import { Plus, Search, Trash2, Edit2 } from 'lucide-react';
import { Transaction } from '../../types';
import { useApp } from '../../context/AppContext';
import { TransactionModal } from './TransactionModal';
import { categoryColors } from '../../data/mockData';

export const TransactionsTable: React.FC = () => {
  const { transactions, deleteTransaction, role } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [editTx, setEditTx] = useState<Transaction | null | undefined>(undefined);

  const filtered = useMemo(() => {
    return transactions
      .filter(t => {
        const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'all' || t.type === filter;
        return matchSearch && matchFilter;
      })
      .sort((a, b) => sortBy === 'date'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : b.amount - a.amount
      );
  }, [transactions, search, filter, sortBy]);

  return (
    <div className="card">
      <div className="table-header">
        <div className="search-box">
          <Search size={16} />
          <input
            placeholder="Search transactions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="table-controls">
          <select value={filter} onChange={e => setFilter(e.target.value as any)} className="select-sm">
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="select-sm">
            <option value="date">Sort: Date</option>
            <option value="amount">Sort: Amount</option>
          </select>
          {role === 'admin' && (
            <button className="btn btn-primary btn-sm" onClick={() => setEditTx(null)}>
              <Plus size={14} /> Add
            </button>
          )}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              {role === 'admin' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map(tx => (
              <tr key={tx.id}>
                <td className="tx-name">{tx.title}</td>
                <td>
                  <span
                    className="badge"
                    style={{ background: categoryColors[tx.category] + '22', color: categoryColors[tx.category] }}
                  >
                    {tx.category}
                  </span>
                </td>
                <td className="muted">{tx.date}</td>
                <td>
                  <span className={`type-badge ${tx.type}`}>{tx.type}</span>
                </td>
                <td className={`amount ${tx.type}`}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                </td>
                {role === 'admin' && (
                  <td className="actions">
                    <button className="icon-btn sm" onClick={() => setEditTx(tx)}><Edit2 size={14} /></button>
                    <button className="icon-btn sm danger" onClick={() => deleteTransaction(tx.id)}><Trash2 size={14} /></button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editTx !== undefined && (
        <TransactionModal
          transaction={editTx}
          onClose={() => setEditTx(undefined)}
        />
      )}
    </div>
  );
};
