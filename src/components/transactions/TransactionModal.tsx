import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Transaction, Category, TransactionType } from '../../types';
import { useApp } from '../../context/AppContext';

const CATEGORIES: Category[] = [
  'Food & Dining', 'Transportation', 'Shopping', 'Entertainment',
  'Healthcare', 'Utilities', 'Housing', 'Education', 'Travel', 'Income', 'Other'
];

interface Props {
  transaction?: Transaction | null;
  onClose: () => void;
}

const empty: Omit<Transaction, 'id'> = {
  title: '', amount: 0, type: 'expense', category: 'Other', date: new Date().toISOString().slice(0, 10)
};

export const TransactionModal: React.FC<Props> = ({ transaction, onClose }) => {
  const { addTransaction, updateTransaction } = useApp();
  const [form, setForm] = useState<Omit<Transaction, 'id'>>(empty);

  useEffect(() => {
    if (transaction) {
      const { id, ...rest } = transaction;
      setForm(rest);
    } else {
      setForm(empty);
    }
  }, [transaction]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transaction) {
      updateTransaction({ ...form, id: transaction.id });
    } else {
      addTransaction(form);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{transaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button className="icon-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Salary" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Amount ($)</label>
              <input name="amount" type="number" value={form.amount} onChange={handleChange} required min="0" step="0.01" />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input name="date" type="date" value={form.date} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>Description (optional)</label>
            <input name="description" value={form.description || ''} onChange={handleChange} placeholder="Notes..." />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {transaction ? 'Update' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
