#!/bin/bash

echo "🚀 Starting Expense Tracker Setup..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Backend setup
echo -e "${BLUE}📦 Setting up Backend...${NC}"
cd backend
npm install

# Create .env file
if [ ! -f .env ]; then
  cp .env.example .env
  echo -e "${GREEN}✅ Created .env file${NC}"
fi

echo -e "${GREEN}✅ Backend setup complete${NC}"

# Frontend setup
echo -e "${BLUE}📦 Setting up Frontend...${NC}"
cd ../frontend
npm install
echo -e "${GREEN}✅ Frontend setup complete${NC}"

cd ..

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${BLUE}📋 Next steps:${NC}"
echo ""
echo "1. Start MongoDB:"
echo "   mongod"
echo ""
echo "2. In a new terminal, start Backend:"
echo "   cd backend"
echo "   npm run seed    # (First time only to seed categories)"
echo "   npm start"
echo ""
echo "3. In another terminal, start Frontend:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
