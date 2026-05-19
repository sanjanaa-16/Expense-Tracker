const Expense = require('../models/Expense');
const Category = require('../models/Category');

// Get all expenses with pagination
exports.getExpenses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const expenses = await Expense.find({ user: req.user._id })
      .populate('category')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Expense.countDocuments({ user: req.user._id });

    res.json({
      expenses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get expenses by date range
exports.getExpensesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const expenses = await Expense.find({
      user: req.user._id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).populate('category').sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id }).populate('category');
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new expense
exports.createExpense = async (req, res) => {
  try {
    const { title, amount, category, date, description, paymentMethod } = req.body;

    const expense = new Expense({
      user: req.user._id,
      title,
      amount,
      category,
      date: date || new Date(),
      description,
      paymentMethod
    });

    await expense.save();
    await expense.populate('category');

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    const { title, amount, category, date, description, paymentMethod } = req.body;

    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, amount, category, date, description, paymentMethod },
      { new: true }
    ).populate('category');

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get summary statistics
exports.getExpenseSummary = async (req, res) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();

    const expenses = await Expense.find({
      user: req.user._id,
      date: { $gte: startDate, $lte: endDate }
    }).populate('category');

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const transactionCount = expenses.length;
    
    const byCategory = {};
    expenses.forEach(exp => {
      const catName = exp.category.name;
      byCategory[catName] = (byCategory[catName] || 0) + exp.amount;
    });

    res.json({
      totalExpenses,
      transactionCount,
      byCategory,
      expenses
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
