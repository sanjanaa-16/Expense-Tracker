# Expense Tracker - Full Stack Application

A comprehensive expense tracking application built with React and Node.js. Track your spending, categorize expenses, and analyze your financial patterns with interactive dashboards and reports.

## Features

- 💰 **Dashboard** - Overview of total expenses, transaction count, and average spending
- ➕ **Add Expense** - Quick and easy expense entry with category and payment method
- 📋 **Expenses List** - View and manage all expenses with search functionality
- 🏷️ **Categories** - Create and manage custom expense categories with icons and colors
- 📊 **Reports** - Detailed analytics with charts and trends
- ⚙️ **Settings** - User preferences, currency, and security settings

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios (HTTP client)
- Recharts (Data visualization)
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcryptjs

## Prerequisites

Before running this project, ensure you have:
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### 1. Clone or Extract the Project

```bash
cd expense-tracker
```

### 2. Setup MongoDB

Make sure MongoDB is running locally or update the connection string in `.env`:

```bash
# For local MongoDB (default)
# MongoDB should be running on mongodb://localhost:27017

# For MongoDB Atlas, update in backend/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
```

### 3. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Seed initial categories
npm run seed

# Start the server
npm start
```

The backend will run on `http://localhost:5000`

### 4. Setup Frontend

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
```

The frontend will open at `http://localhost:3000`

## Usage

1. **Add Expense** - Navigate to "Add Expense" page to record a new expense
2. **View Expenses** - Check the "Expenses" page to see all recorded expenses
3. **Manage Categories** - Create, edit, or delete expense categories
4. **View Reports** - Check analytics and spending trends in the Reports section
5. **Settings** - Configure preferences, currency, and user profile

## API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses (paginated)
- `GET /api/expenses/:id` - Get expense by ID
- `GET /api/expenses/date-range` - Get expenses by date range
- `GET /api/expenses/summary` - Get expense summary
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## Project Structure

```
expense-tracker/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Expense.js
│   │   │   ├── Category.js
│   │   │   └── User.js
│   │   ├── controllers/
│   │   │   ├── expenseController.js
│   │   │   └── categoryController.js
│   │   ├── routes/
│   │   │   ├── expenseRoutes.js
│   │   │   └── categoryRoutes.js
│   │   └── server.js
│   ├── package.json
│   ├── .env.example
│   └── seed.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.js
    │   │   └── Header.js
    │   ├── pages/
    │   │   ├── Dashboard.js
    │   │   ├── AddExpense.js
    │   │   ├── ExpensesList.js
    │   │   ├── Categories.js
    │   │   ├── Reports.js
    │   │   └── Settings.js
    │   ├── styles/
    │   │   └── global.css
    │   ├── App.js
    │   └── index.js
    ├── public/
    │   └── index.html
    └── package.json
```

## Database Schema

### Expense Model
```javascript
{
  title: String,
  amount: Number,
  category: ObjectId (ref: Category),
  date: Date,
  description: String,
  paymentMethod: String (Cash, Credit Card, Debit Card, Bank Transfer, UPI),
  createdAt: Date
}
```

### Category Model
```javascript
{
  name: String,
  icon: String,
  color: String,
  description: String,
  createdAt: Date
}
```

## Running Scripts

### Backend
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start

# Seed initial categories
npm run seed
```

### Frontend
```bash
# Development mode
npm start

# Production build
npm build
```

## Configuration

### Backend Environment Variables (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas, verify network access is allowed

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: The app will prompt to use a different port

### Dependencies Installation Failed
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Future Enhancements

- 🔐 User authentication and multi-user support
- 📱 Mobile app with React Native
- 🔔 Email notifications for budgets
- 💳 Integration with banking APIs
- 📈 Advanced forecasting and budgeting
- 🌐 Multi-language support
- 🎨 Customizable themes

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please check the documentation or create an issue in the repository.

---

Built with ❤️ by Your Name
