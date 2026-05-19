import React, { useState, useEffect } from 'react';
import axios from '../api';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '💳',
    color: '#3b82f6',
    description: ''
  });

  const icons = ['💳', '🛒', '🍔', '🚗', '🏠', '👕', '📱', '🎮', '📚', '⚕️', '✈️', '🎬'];
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#6366f1'];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`/api/categories/${editingId}`, formData);
        alert('Category updated successfully!');
      } else {
        await axios.post('/api/categories', formData);
        alert('Category added successfully!');
      }
      fetchCategories();
      resetForm();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error saving category');
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      icon: category.icon,
      color: category.color,
      description: category.description
    });
    setEditingId(category._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`/api/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Error deleting category');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      icon: '💳',
      color: '#3b82f6',
      description: ''
    });
    setEditingId(null);
    setShowModal(false);
  };

  if (loading) {
    return <div className="page-content"><p>Loading...</p></div>;
  }

  return (
    <div className="page-content">
      <div className="categories-header">
        <h1>Categories</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus size={20} />
          Add Category
        </button>
      </div>

      <div className="categories-grid">
        {categories.map(category => (
          <div key={category._id} className="category-card" style={{ borderLeftColor: category.color }}>
            <div className="category-icon" style={{ backgroundColor: category.color }}>
              {category.icon}
            </div>
            <div className="category-info">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
            <div className="category-actions">
              <button
                className="action-btn edit"
                onClick={() => handleEdit(category)}
                title="Edit"
              >
                <FiEdit2 size={18} />
              </button>
              <button
                className="action-btn delete"
                onClick={() => handleDelete(category._id)}
                title="Delete"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal show">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{editingId ? 'Edit Category' : 'Add New Category'}</h2>
              <button className="modal-close" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Category Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Food"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="icon">Icon</label>
                <div className="icon-picker">
                  {icons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-option ${formData.icon === icon ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, icon }))}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="color">Color</label>
                <div className="color-picker">
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${formData.color === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Optional description"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update' : 'Add'} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
