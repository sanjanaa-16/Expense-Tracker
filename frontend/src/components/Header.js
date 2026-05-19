import React from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-title">
        <h1>Welcome, {user?.name || 'there'}</h1>
      </div>
      <div className="header-actions">
        <button className="header-btn">
          <FiUser size={20} />
          <span>{user?.email}</span>
        </button>
        <button className="header-btn logout" onClick={logout}>
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
