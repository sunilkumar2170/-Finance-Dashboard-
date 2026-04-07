import { Transaction, ChartDataPoint, CategorySpend } from '../types';

export const mockTransactions: Transaction[] = [
  { id: '1', title: 'Salary', amount: 5000, type: 'income', category: 'Income', date: '2024-03-01', description: 'Monthly salary' },
  { id: '2', title: 'Rent', amount: 1500, type: 'expense', category: 'Housing', date: '2024-03-02' },
  { id: '3', title: 'Groceries', amount: 120, type: 'expense', category: 'Food & Dining', date: '2024-03-03' },
  { id: '4', title: 'Netflix', amount: 15, type: 'expense', category: 'Entertainment', date: '2024-03-04' },
  { id: '5', title: 'Freelance', amount: 800, type: 'income', category: 'Income', date: '2024-03-05' },
  { id: '6', title: 'Gas', amount: 60, type: 'expense', category: 'Transportation', date: '2024-03-06' },
  { id: '7', title: 'Doctor Visit', amount: 200, type: 'expense', category: 'Healthcare', date: '2024-03-07' },
  { id: '8', title: 'Amazon', amount: 85, type: 'expense', category: 'Shopping', date: '2024-03-08' },
  { id: '9', title: 'Electric Bill', amount: 90, type: 'expense', category: 'Utilities', date: '2024-03-09' },
  { id: '10', title: 'Online Course', amount: 49, type: 'expense', category: 'Education', date: '2024-03-10' },
  { id: '11', title: 'Bonus', amount: 1000, type: 'income', category: 'Income', date: '2024-03-11' },
  { id: '12', title: 'Restaurant', amount: 75, type: 'expense', category: 'Food & Dining', date: '2024-03-12' },
  { id: '13', title: 'Uber', amount: 25, type: 'expense', category: 'Transportation', date: '2024-03-13' },
  { id: '14', title: 'Flight Tickets', amount: 350, type: 'expense', category: 'Travel', date: '2024-03-14' },
  { id: '15', title: 'Gym', amount: 40, type: 'expense', category: 'Healthcare', date: '2024-03-15' },
  { id: '16', title: 'Internet', amount: 50, type: 'expense', category: 'Utilities', date: '2024-03-16' },
  { id: '17', title: 'Coffee Shop', amount: 30, type: 'expense', category: 'Food & Dining', date: '2024-03-17' },
  { id: '18', title: 'Side Project', amount: 500, type: 'income', category: 'Income', date: '2024-03-18' },
  { id: '19', title: 'Clothing', amount: 150, type: 'expense', category: 'Shopping', date: '2024-03-19' },
  { id: '20', title: 'Books', amount: 35, type: 'expense', category: 'Education', date: '2024-03-20' },
  { id: '21', title: 'Spotify', amount: 10, type: 'expense', category: 'Entertainment', date: '2024-03-21' },
  { id: '22', title: 'Bus Pass', amount: 45, type: 'expense', category: 'Transportation', date: '2024-03-22' },
  { id: '23', title: 'Pharmacy', amount: 65, type: 'expense', category: 'Healthcare', date: '2024-03-23' },
  { id: '24', title: 'Hotel', amount: 200, type: 'expense', category: 'Travel', date: '2024-03-24' },
  { id: '25', title: 'Investment Return', amount: 250, type: 'income', category: 'Income', date: '2024-03-25' },
];

export const chartData: ChartDataPoint[] = [
  { month: 'Oct', income: 6200, expenses: 3800, savings: 2400 },
  { month: 'Nov', income: 5800, expenses: 4100, savings: 1700 },
  { month: 'Dec', income: 7500, expenses: 5200, savings: 2300 },
  { month: 'Jan', income: 6000, expenses: 3600, savings: 2400 },
  { month: 'Feb', income: 6300, expenses: 3900, savings: 2400 },
  { month: 'Mar', income: 7550, expenses: 3244, savings: 4306 },
];

export const categoryColors: Record<string, string> = {
  'Food & Dining': '#f97316',
  'Transportation': '#3b82f6',
  'Shopping': '#a855f7',
  'Entertainment': '#ec4899',
  'Healthcare': '#10b981',
  'Utilities': '#f59e0b',
  'Housing': '#ef4444',
  'Education': '#6366f1',
  'Travel': '#14b8a6',
  'Income': '#22c55e',
  'Other': '#6b7280',
};

export const getCategorySpend = (transactions: Transaction[]): CategorySpend[] => {
  const spend: Record<string, number> = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    spend[t.category] = (spend[t.category] || 0) + t.amount;
  });
  return Object.entries(spend).map(([name, value]) => ({
    name: name as any,
    value,
    color: categoryColors[name] || '#6b7280',
  })).sort((a, b) => b.value - a.value);
};
