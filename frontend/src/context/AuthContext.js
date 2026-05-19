import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('expenseTrackerUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('expenseTrackerToken')));

  useEffect(() => {
    const token = localStorage.getItem('expenseTrackerToken');

    if (!token) {
      setLoading(false);
      return;
    }

    api.get('/api/auth/me')
      .then((response) => {
        setUser(response.data.user);
        localStorage.setItem('expenseTrackerUser', JSON.stringify(response.data.user));
      })
      .catch(() => {
        localStorage.removeItem('expenseTrackerToken');
        localStorage.removeItem('expenseTrackerUser');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const persistSession = (data) => {
    localStorage.setItem('expenseTrackerToken', data.token);
    localStorage.setItem('expenseTrackerUser', JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = useCallback(async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    persistSession(response.data);
  }, []);

  const register = useCallback(async (formData) => {
    const response = await api.post('/api/auth/register', formData);
    persistSession(response.data);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('expenseTrackerToken');
    localStorage.removeItem('expenseTrackerUser');
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (profile) => {
    const response = await api.put('/api/auth/me', profile);
    localStorage.setItem('expenseTrackerUser', JSON.stringify(response.data.user));
    setUser(response.data.user);
    return response.data.user;
  }, []);

  const updatePassword = useCallback(async (passwords) => {
    await api.put('/api/auth/password', passwords);
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    updatePassword
  }), [user, loading, login, register, logout, updateProfile, updatePassword]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
