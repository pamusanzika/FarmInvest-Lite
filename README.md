# FarmInvest Lite

A production-quality mobile app for managing agricultural investments, built with React Native (Expo) and Express + MySQL.

## 🎯 Project Overview

This application demonstrates best practices in mobile and backend development:
- Clean, maintainable code structure
- Proper error handling and loading states
- Optimistic UI updates
- Type safety with TypeScript
- Comprehensive testing
- Clear documentation

## 📁 Repository Structure
```
farminvest-lite/
├── mobile/      # React Native (Expo) mobile app
├── backend/     # Express + MySQL REST API
└── README.md    # This file
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
mysql -u root -p < schema.sql
mysql -u root -p < seed.sql
npm run dev
```

Backend runs on `http://localhost:3000`

### Mobile Setup
```bash
cd mobile
npm install
# Update API_URL in src/services/api.ts
npm start
```

## ✨ Features

### Mobile App
- ✅ List investments with FlatList
- ✅ Pull-to-refresh functionality
- ✅ Create investment via modal
- ✅ Optimistic UI updates with rollback
- ✅ Loading and error states
- ✅ Clean, modern UI/UX

### Backend API
- ✅ GET /api/investments - List all
- ✅ POST /api/investments - Create new
- ✅ SQL injection prevention
- ✅ Input validation
- ✅ Proper HTTP status codes

## 🧪 Testing
```bash
cd mobile
npm test
```

## 🏗️ Tech Stack

- **Mobile:** React Native, Expo, TypeScript
- **Backend:** Express, MySQL, Node.js
- **Testing:** Jest, React Native Testing Library

## 📄 License

MIT
