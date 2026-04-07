export type Category =
  | 'Food & Dining'
  | 'Transportation'
  | 'Shopping'
  | 'Entertainment'
  | 'Healthcare'
  | 'Utilities'
  | 'Housing'
  | 'Education'
  | 'Travel'
  | 'Income'
  | 'Other';

export type TransactionType = 'income' | 'expense';

export type Role = 'admin' | 'viewer';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
  description?: string;
}

export interface ChartDataPoint {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface CategorySpend {
  name: Category;
  value: number;
  color: string;
}

export interface SummaryStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
}

export interface AppState {
  transactions: Transaction[];
  role: Role;
  darkMode: boolean;
}
