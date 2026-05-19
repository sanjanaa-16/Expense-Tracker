const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'expense_tracker_secret', {
    expiresIn: '30d'
  });
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  currency: user.currency,
  theme: user.theme
});

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      user: sanitizeUser(user),
      token: createToken(user._id)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      user: sanitizeUser(user),
      token: createToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMe = async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
};

exports.updateMe = async (req, res) => {
  try {
    const { name, email, currency, theme } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'An account with this email already exists' });
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (currency) user.currency = currency;
    if (theme) user.theme = theme;

    await user.save();

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
