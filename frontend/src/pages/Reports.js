import React, { useState, useEffect } from 'react';
import axios from '../api';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Reports.css';

const Reports = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('month');

  useEffect(() => {
    fetchSummary();
  }, [dateRange]);

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
    value,
    percentage: ((value / summary.totalExpenses) * 100).toFixed(1)
  })) : [];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#6366f1'];

  const trendData = [
    { month: 'Jan', expenses: 15000 },
    { month: 'Feb', expenses: 18000 },
    { month: 'Mar', expenses: 16000 },
    { month: 'Apr', expenses: 22000 },
    { month: 'May', expenses: summary?.totalExpenses || 20000 }
  ];

  return (
    <div className="page-content">
      <div className="reports-header">
        <h1>Reports & Analytics</h1>
        <select
          className="date-range-select"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-label">Total Expenses</div>
          <div className="summary-value">₹{summary?.totalExpenses?.toLocaleString()}</div>
          <div className="summary-change">+5.2% from last month</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Average Expense</div>
          <div className="summary-value">₹{summary?.transactionCount > 0 ? Math.round(summary?.totalExpenses / summary?.transactionCount).toLocaleString() : 0}</div>
          <div className="summary-change">+2.1% from last month</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Total Transactions</div>
          <div className="summary-value">{summary?.transactionCount}</div>
          <div className="summary-change">+8 transactions</div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-wrapper half">
          <div className="chart-title">Spending by Category</div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
              <XAxis stroke="#b0b0b0" />
              <YAxis stroke="#b0b0b0" />
              <Tooltip
                contentStyle={{ backgroundColor: '#16213e', border: '1px solid #2a2a3e' }}
                formatter={(value) => `₹${value}`}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-wrapper half">
          <div className="chart-title">Category Distribution</div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
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
      </div>

      <div className="chart-wrapper full">
        <div className="chart-title">Monthly Trend</div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
            <XAxis stroke="#b0b0b0" />
            <YAxis stroke="#b0b0b0" />
            <Tooltip
              contentStyle={{ backgroundColor: '#16213e', border: '1px solid #2a2a3e' }}
              formatter={(value) => `₹${value}`}
            />
            <Legend />
            <Line type="monotone" dataKey="expenses" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="category-breakdown">
        <h3>Detailed Breakdown</h3>
        <table className="breakdown-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Percentage</th>
              <th>Transactions</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="category-with-color">
                    <div className="color-dot" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    {item.name}
                  </div>
                </td>
                <td>₹{item.value.toLocaleString()}</td>
                <td>{item.percentage}%</td>
                <td>5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
