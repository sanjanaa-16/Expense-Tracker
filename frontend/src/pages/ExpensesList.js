import React, { useCallback, useState, useEffect } from 'react';
import axios from '../api';
import { FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import './ExpensesList.css';

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await axios.get(`/api/expenses?page=${currentPage}`);
      setExpenses(response.data.expenses);
      setTotalPages(response.data.pagination.pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  }, [currentPage]);

  const filterExpenses = useCallback(() => {
    const filtered = expenses.filter(expense =>
      expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExpenses(filtered);
  }, [expenses, searchTerm]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  useEffect(() => {
    filterExpenses();
  }, [filterExpenses]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`/api/expenses/${id}`);
        setExpenses(expenses.filter(exp => exp._id !== id));
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Error deleting expense');
      }
    }
  };

  if (loading) {
    return <div className="page-content"><p>Loading...</p></div>;
  }

  return (
    <div className="page-content">
      <h1>All Expenses</h1>

      <div className="expenses-header">
        <div className="search-box">
          <FiSearch size={20} />
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="expenses-table">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map(expense => (
                <tr key={expense._id}>
                  <td>{expense.title}</td>
                  <td>
                    <span className="category-badge" style={{ backgroundColor: expense.category?.color }}>
                      {expense.category?.name}
                    </span>
                  </td>
                  <td className="amount">₹{expense.amount.toLocaleString()}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.paymentMethod}</td>
                  <td className="actions">
                    <button className="action-btn edit" title="Edit">
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      className="action-btn delete"
                      title="Delete"
                      onClick={() => handleDelete(expense._id)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No expenses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="page-btn"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExpensesList;
