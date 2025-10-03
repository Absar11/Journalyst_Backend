# Journalyst Backend – Broker Integration

## Overview
Backend module for syncing trades from third-party brokers (e.g., Zerodha).  
Built with **Node.js + Express (JavaScript)**, modular & scalable.  

---

## Project Structure

src/
├── index.js # Server entrypoint
├── routes/
│ └── syncRoutes.js # API routes
├── services/
│ ├── syncService.js # Sync logic + normalization flow
│ └── tokenManager.js # Token handling & refresh
├── adapters/
│ └── zerodhaAdapter.js # Broker adapter
└── utils/
└── normalizer.js # Trade normalization


---

## Installation & Run

```bash
cd src
npm install
npm run dev
Server runs at: http://localhost:4000

---

## API Endpoint

GET /api/sync/:userId/:broker

Parameter	Description
userId	Unique identifier of user
broker	Broker name (e.g., zerodha)

# Example
GET http://localhost:4000/api/sync/123/zerodha

# Response
{
  "success": true,
  "trades": [
    { "symbol": "TCS", "quantity": 2, "price": 3500, "timestamp": "2025-10-01T10:00:00Z" },
    { "symbol": "INFY", "quantity": 5, "price": 1500, "timestamp": "2025-10-01T11:00:00Z" }
  ]
}

--- 

##  Adding a New Broker

Create a new adapter in adapters/.

Add normalization function in utils/normalizer.js.

Update broker check in services/syncService.js.

--- 

## Notes

Token refresh simulated (5 min expiry).

In-memory token storage (replace with DB/Redis in production).

Clean & modular code for scalability and easy extension.

