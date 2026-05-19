@echo off
echo 🚀 Starting Expense Tracker Setup...
echo.

REM Backend setup
echo 📦 Setting up Backend...
cd backend
call npm install

REM Create .env file
if not exist .env (
  copy .env.example .env
  echo ✅ Created .env file
)

echo ✅ Backend setup complete
echo.

REM Frontend setup
echo 📦 Setting up Frontend...
cd ..\frontend
call npm install
echo ✅ Frontend setup complete
echo.

cd ..

echo ✅ Setup complete!
echo.
echo 📋 Next steps:
echo.
echo 1. Start MongoDB:
echo    mongod
echo.
echo 2. In a new terminal, start Backend:
echo    cd backend
echo    npm run seed    (First time only to seed categories)
echo    npm start
echo.
echo 3. In another terminal, start Frontend:
echo    cd frontend
echo    npm start
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
