import React from 'react';
import { SummaryCards } from '../dashboard/SummaryCards';
import { AreaChartCard } from '../dashboard/AreaChartCard';
import { PieChartCard } from '../dashboard/PieChartCard';
import { RecentTransactions } from '../dashboard/RecentTransactions';

export const DashboardPage: React.FC = () => (
  <div className="dashboard-grid">
    <div className="span-full"><SummaryCards /></div>
    <AreaChartCard />
    <PieChartCard />
    <div className="span-full"><RecentTransactions /></div>
  </div>
);
