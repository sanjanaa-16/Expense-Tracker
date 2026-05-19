import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import ExpensesList from './pages/ExpensesList';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/global.css';

const AppShell = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    document.documentElement.dataset.theme = user?.theme || 'dark';
  }, [user?.theme]);

  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/expenses" element={<ExpensesList />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}

export default App;
