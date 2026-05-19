import React, { useState, useEffect } from 'react';
import axios from '../api';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiTrendingUp, FiShoppingCart, FiCreditCard } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await axios.get('/api/expenses/summary');
      setSummary(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page-content"><p>Loading...</p></div>;
  }

  const chartData = summary ? Object.entries(summary.byCategory).map(([name, value]) => ({
    name,
    value
  })) : [];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="page-content">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <FiCreditCard size={32} />
          </div>
          <div className="stat-details">
            <div className="stat-label">Total Expenses</div>
            <div className="stat-value">₹{summary?.totalExpenses?.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon transactions">
            <FiShoppingCart size={32} />
          </div>
          <div className="stat-details">
            <div className="stat-label">Transactions</div>
            <div className="stat-value">{summary?.transactionCount}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon average">
            <FiTrendingUp size={32} />
          </div>
          <div className="stat-details">
            <div className="stat-label">Average Expense</div>
            <div className="stat-value">₹{summary?.transactionCount > 0 ? Math.round(summary?.totalExpenses / summary?.transactionCount).toLocaleString() : 0}</div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
              <XAxis stroke="#b0b0b0" />
              <YAxis stroke="#b0b0b0" />
              <Tooltip
                contentStyle={{ backgroundColor: '#16213e', border: '1px solid #2a2a3e' }}
                formatter={(value) => `₹${value}`}
              />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {summary?.expenses?.slice(0, 5).map((expense) => (
              <tr key={expense._id}>
                <td>{expense.title}</td>
                <td>{expense.category?.name}</td>
                <td className="amount">₹{expense.amount.toLocaleString()}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
