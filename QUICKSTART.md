# 🚀 Quick Start Guide

## Get Running in 5 Minutes!

### Prerequisites
- Node.js installed
- MongoDB installed and running
- npm or yarn

### Step 1: Install Dependencies (2 minutes)

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
bash setup.sh
```

Or manually:
```bash
# Backend
cd backend
npm install
cp .env.example .env

# Frontend
cd ../frontend
npm install
```

### Step 2: Start MongoDB

Make sure MongoDB is running:
```bash
# Windows
mongod

# Mac (if installed via Homebrew)
brew services start mongodb-community

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### Step 3: Seed Database (First Time Only)

```bash
cd backend
npm run seed
```

This will add 10 default expense categories.

### Step 4: Start the Backend

```bash
cd backend
npm start
```

Backend will be available at: **http://localhost:5000**

### Step 5: Start the Frontend

In a new terminal:
```bash
cd frontend
npm start
```

Frontend will open at: **http://localhost:3000**

---

## 🎉 That's It!

Your Expense Tracker is now running! 

- Navigate to different pages using the sidebar menu
- Add expenses, manage categories, and view reports
- All data is saved in MongoDB

---

## Common Issues

### "MongoDB Connection Error"
- Ensure MongoDB is running
- Check port 27017 is not blocked
- Update `MONGODB_URI` in `backend/.env` if using Atlas

### "Port Already in Use"
- Backend: Change `PORT` in `backend/.env`
- Frontend: You'll be prompted to use a different port

### "npm install fails"
- Delete `node_modules` folder
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

---

## Useful Commands

### Backend
```bash
npm start       # Start server
npm run dev     # Start with auto-reload
npm run seed    # Seed categories
```

### Frontend
```bash
npm start       # Start dev server
npm run build   # Create production build
```

---

## Testing the API

### Create an Expense
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lunch",
    "amount": 500,
    "category": "CATEGORY_ID",
    "date": "2024-05-19"
  }'
```

### Get All Expenses
```bash
curl http://localhost:5000/api/expenses
```

### Get All Categories
```bash
curl http://localhost:5000/api/categories
```

---

## Default Categories After Seeding

1. 🍔 Food & Dining
2. 🚗 Transportation
3. 🛒 Shopping
4. 🎬 Entertainment
5. ⚕️ Health & Fitness
6. 💡 Bills & Utilities
7. ✈️ Travel
8. 📚 Education
9. 💄 Personal Care
10. 📌 Miscellaneous

---

## Docker Setup (Optional)

```bash
docker-compose up
```

This will automatically start MongoDB, Backend, and Frontend.

---

## UI Features

- **Dark Theme** - Easy on the eyes
- **Dashboard** - See your spending overview
- **Add Expense** - Quick expense entry
- **Expenses List** - Search and manage all expenses
- **Categories** - Customize with icons and colors
- **Reports** - Charts and analytics
- **Settings** - Personalize your experience

---

## Next Steps

- Explore the Reports section to see analytics
- Create custom categories
- Add expenses and track your spending
- Check the full README.md for advanced features

Enjoy tracking your expenses! 💰
