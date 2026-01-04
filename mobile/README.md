# FarmInvest Lite - Mobile App

React Native (Expo) mobile application for tracking farm investments.

## Setup

1. **Install dependencies:**
```bash
   npm install
```

2. **Update API URL:**
   Edit `src/services/api.ts` and set your backend URL:
```typescript
   const API_URL = 'http://YOUR_IP:3000/api';
```

3. **Start the app:**
```bash
   npm start
```

4. **Run on device/simulator:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go for physical device

## Testing
```bash
npm test
```

## Features

✅ List investments with pull-to-refresh
✅ Create new investments via modal
✅ Optimistic UI updates
✅ Rollback on failure
✅ Loading & error states
✅ TypeScript type safety
