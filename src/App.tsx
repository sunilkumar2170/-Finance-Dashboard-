import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { TransactionsTable } from './components/transactions/TransactionsTable';
import { InsightsPage } from './components/insights/InsightsPage';

const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights & Analytics',
  settings: 'Settings',
};

const AppInner: React.FC = () => {
  const [page, setPage] = useState('dashboard');

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <DashboardPage />;
      case 'transactions': return <TransactionsTable />;
      case 'insights': return <InsightsPage />;
      case 'settings': return (
        <div className="card">
          <h2 className="card-title">Settings</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Settings panel coming soon.</p>
        </div>
      );
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activePage={page} onNavigate={setPage} />
      <div className="main-content">
        <Header title={PAGE_TITLES[page]} />
        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

export default App;
