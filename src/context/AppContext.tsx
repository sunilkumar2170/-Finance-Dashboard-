import React, { createContext, useContext, useState, useCallback } from 'react';
import { Transaction, Role, AppState } from '../types';
import { mockTransactions } from '../data/mockData';

interface AppContextType extends AppState {
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  updateTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  setRole: (r: Role) => void;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [role, setRole] = useState<Role>('admin');
  const [darkMode, setDarkMode] = useState(false);

  const addTransaction = useCallback((t: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [{ ...t, id: Date.now().toString() }, ...prev]);
  }, []);

  const updateTransaction = useCallback((t: Transaction) => {
    setTransactions(prev => prev.map(tx => tx.id === t.id ? t : tx));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  }, []);

  const toggleDarkMode = useCallback(() => setDarkMode(d => !d), []);

  return (
    <AppContext.Provider value={{
      transactions, role, darkMode,
      addTransaction, updateTransaction, deleteTransaction,
      setRole, toggleDarkMode
    }}>
      <div className={darkMode ? 'dark' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
