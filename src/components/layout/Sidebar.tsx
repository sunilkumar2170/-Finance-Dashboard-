import React from 'react';
import { LayoutDashboard, ArrowLeftRight, TrendingUp, Settings, Shield, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: TrendingUp },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const { role, setRole } = useApp();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">₿</span>
        <span className="logo-text">Finova</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item ${activePage === id ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="role-toggle">
        <p className="role-label">Current Role</p>
        <div className="role-buttons">
          <button
            className={`role-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            <Shield size={14} /> Admin
          </button>
          <button
            className={`role-btn ${role === 'viewer' ? 'active' : ''}`}
            onClick={() => setRole('viewer')}
          >
            <Eye size={14} /> Viewer
          </button>
        </div>
      </div>
    </aside>
  );
};
