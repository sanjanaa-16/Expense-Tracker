const mongoose = require('mongoose');
const Category = require('./src/models/Category');
require('dotenv').config();

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker');
    
    const categories = [
      { name: 'Food & Dining', icon: '🍔', color: '#f59e0b', description: 'Restaurants, groceries, and food delivery' },
      { name: 'Transportation', icon: '🚗', color: '#3b82f6', description: 'Gas, public transport, and vehicle maintenance' },
      { name: 'Shopping', icon: '🛒', color: '#8b5cf6', description: 'Clothing, accessories, and general shopping' },
      { name: 'Entertainment', icon: '🎬', color: '#ec4899', description: 'Movies, games, and entertainment' },
      { name: 'Health & Fitness', icon: '⚕️', color: '#10b981', description: 'Medical, gym, and wellness' },
      { name: 'Bills & Utilities', icon: '💡', color: '#6366f1', description: 'Electric, water, and internet bills' },
      { name: 'Travel', icon: '✈️', color: '#06b6d4', description: 'Flights, hotels, and vacation' },
      { name: 'Education', icon: '📚', color: '#ef4444', description: 'Books, courses, and tuition' },
      { name: 'Personal Care', icon: '💄', color: '#f97316', description: 'Haircut, grooming, and skincare' },
      { name: 'Miscellaneous', icon: '📌', color: '#a78bfa', description: 'Other expenses' }
    ];

    await Category.deleteMany({});
    await Category.insertMany(categories);

    console.log('✅ Categories seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
