import React, { useState } from 'react';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const isRegistering = mode === 'register';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        await register(formData);
      } else {
        await login({ email: formData.email, password: formData.password });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-brand">
          <div className="auth-logo">$</div>
          <h1>Expense Tracker</h1>
          <p>{isRegistering ? 'Create your account to start tracking expenses.' : 'Sign in to manage your expenses.'}</p>
        </div>

        <div className="auth-switch">
          <button
            type="button"
            className={mode === 'login' ? 'active' : ''}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'active' : ''}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegistering && (
            <label className="auth-field">
              <span>Name</span>
              <div>
                <FiUser size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
            </label>
          )}

          <label className="auth-field">
            <span>Email</span>
            <div>
              <FiMail size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div>
              <FiLock size={18} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                minLength="6"
                required
              />
            </div>
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Please wait...' : isRegistering ? 'Create Account' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
