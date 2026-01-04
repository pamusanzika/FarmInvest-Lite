# FarmInvest Lite - Backend

Express + MySQL REST API for managing farm investments.

## Setup

1. **Install dependencies:**
```bash
   npm install
```

2. **Configure database:**
   - Copy `.env.example` to `.env`
   - Update database credentials

3. **Create database and tables:**
```bash
   mysql -u root -p < schema.sql
```

4. **Seed data (optional):**
```bash
   mysql -u root -p < seed.sql
```

5. **Start server:**
```bash
   npm run dev    # Development with auto-reload
   npm start      # Production
```

Server runs on `http://localhost:3000`

## API Endpoints

### GET /api/investments
Returns all investments ordered by creation date (newest first).

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "farmer_name": "John Doe",
    "crop": "Wheat",
    "amount": 5000,
    "created_at": "2025-01-01T10:00:00.000Z"
  }
]
```

### POST /api/investments
Creates a new investment.

**Request Body:**
```json
{
  "farmer_name": "John Doe",
  "crop": "Wheat",
  "amount": 5000
}
```

**Response:** `201 Created`
```json
{
  "id": 6,
  "farmer_name": "John Doe",
  "crop": "Wheat",
  "amount": 5000,
  "created_at": "2025-01-04T12:00:00.000Z"
}
```

## Database Schema
```sql
CREATE TABLE investments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farmer_name VARCHAR(255) NOT NULL,
  crop VARCHAR(100) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Features

- Parameterized SQL queries (prevents SQL injection)
- Input validation
- CORS enabled
- Proper HTTP status codes
