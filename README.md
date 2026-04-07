# Finova Finance Dashboard

A production-grade Finance Dashboard built with React + TypeScript + Vite.

## 🚀 Setup

```bash
npm install
npm run dev
```

Opens at → http://localhost:5173

## ✅ Features
- Summary cards: Balance, Income, Expenses, Savings Rate
- Area chart (Income vs Expenses trend)
- Pie chart (Spending by Category)
- Transactions table with search, filter, sort
- Add / Edit / Delete transactions (Admin role)
- Admin / Viewer role toggle
- Dark mode toggle
- CSV export
- Fully responsive

## 📁 Structure
```
src/
├── types/index.ts         ← All TypeScript types (Category, Transaction, etc.)
├── context/AppContext.tsx ← Global state
├── data/mockData.ts       ← 25 mock transactions + chart data
├── components/
│   ├── layout/            ← Sidebar, Header
│   ├── dashboard/         ← SummaryCards, AreaChart, PieChart, RecentTx
│   ├── transactions/      ← Table + Modal
│   └── insights/          ← Charts & Analytics
```
