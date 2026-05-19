import React, { useEffect, useState } from 'react';
import { FiBell, FiGlobe, FiLock, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

const Settings = () => {
  const { user, updatePassword, updateProfile } = useAuth();
  const [settings, setSettings] = useState({
    fullName: '',
    email: '',
    currency: '₹',
    theme: 'dark',
    notifications: true,
    emailNotifications: true
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setSettings(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        currency: user.currency || '₹',
        theme: user.theme || 'dark'
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'theme') {
      document.documentElement.dataset.theme = value;
    }

    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSaveStatus('saving');

    try {
      await updateProfile({
        name: settings.fullName,
        email: settings.email,
        currency: settings.currency,
        theme: settings.theme
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not save settings');
      setSaveStatus('');
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setError('');

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setSaveStatus('saving');

    try {
      await updatePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not update password');
      setSaveStatus('');
    }
  };

  return (
    <div className="page-content">
      <h1>Settings</h1>

      <div className="settings-container">
        <div className="settings-sidebar">
          <button
            className={`settings-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FiUser size={20} />
            Profile
          </button>
          <button
            className={`settings-tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <FiGlobe size={20} />
            Preferences
          </button>
          <button
            className={`settings-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FiBell size={20} />
            Notifications
          </button>
          <button
            className={`settings-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <FiLock size={20} />
            Security
          </button>
        </div>

        <div className="settings-content">
          {error && <div className="settings-error">{error}</div>}

          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>Profile Settings</h2>
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={settings.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="settings-section">
              <h2>Preferences</h2>
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label htmlFor="currency">Currency</label>
                  <select
                    id="currency"
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                  >
                    <option value="₹">Indian Rupee (₹)</option>
                    <option value="$">US Dollar ($)</option>
                    <option value="€">Euro (€)</option>
                    <option value="£">British Pound (£)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="theme">Theme</label>
                  <select
                    id="theme"
                    name="theme"
                    value={settings.theme}
                    onChange={handleChange}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notifications</h2>
              <form onSubmit={handleSave}>
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleChange}
                  />
                  <label htmlFor="notifications">
                    <strong>In-App Notifications</strong>
                    <p>Receive notifications within the app</p>
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                  />
                  <label htmlFor="emailNotifications">
                    <strong>Email Notifications</strong>
                    <p>Receive weekly expense summaries</p>
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              <form onSubmit={handlePasswordSave}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter your current password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    minLength="6"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    minLength="6"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Update Password'}
                  </button>
                </div>
              </form>

              <div className="danger-zone">
                <h3>Danger Zone</h3>
                <button className="btn btn-danger">Delete Account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
