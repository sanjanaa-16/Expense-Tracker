import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiPlus, FiList, FiGrid, FiBarChart2, FiSettings } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/add-expense', icon: FiPlus, label: 'Add Expense' },
    { path: '/expenses', icon: FiList, label: 'Expenses' },
    { path: '/categories', icon: FiGrid, label: 'Categories' },
    { path: '/reports', icon: FiBarChart2, label: 'Reports' },
    { path: '/settings', icon: FiSettings, label: 'Settings' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>💰 Expense Tracker</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
