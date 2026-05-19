const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', expenseController.getExpenses);
router.get('/date-range', expenseController.getExpensesByDateRange);
router.get('/summary', expenseController.getExpenseSummary);
router.get('/:id', expenseController.getExpenseById);
router.post('/', expenseController.createExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
