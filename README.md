# Journalyst Backend – Broker Integration Layer (One-Way Sync)

This project implements a simplified **Broker Integration Layer** for syncing trades from external brokers into Journalyst.

---

## Design Decisions
- **Broker Adapter Pattern**: Created a reusable interface (`adapters/`) so each broker (Zerodha, Alpaca, etc.) can have its own adapter.  
- **Normalization Layer**: Since brokers return trades in different formats, a normalizer ensures consistent trade objects (`symbol, quantity, price, timestamp`).  
- **Token Management**:  
  - Tokens stored in-memory for each user.  
  - Expiry + refresh flow simulated.  
- **Sync Service**: Handles fetching token → refreshing if expired → fetching trades → normalizing → returning results.  
- **Clean Architecture**: Code separated into `adapters`, `services`, and `utils` for scalability.

---

## How to Add a New Broker
1. Create a new adapter file inside `src/adapters/` (e.g., `alpacaAdapter.js`).  
   Example:
   ```js
   class AlpacaAdapter {
     async fetchTrades(token) {
       // Fetch trades from Alpaca API
       return [
         { symbol: "AAPL", qty: 2, price: 170, timestamp: Date.now() }
       ];
     }
   }
   module.exports = AlpacaAdapter;

2. Register the broker inside syncService.js:/
   const adapters = {
     zerodha: new ZerodhaAdapter(),
    alpaca: new AlpacaAdapter()
  };

3. Call the sync endpoint:
   GET /api/sync/:userId/:brokerName

##  Assumptions / Simplifications
  - **In-Memory Token Storage:** No database/Redis used — tokens vanish after server restart.
  - **Token Refresh:** Currently mocked with setTimeout; real-world needs mutex/locking to avoid multiple refreshes at once.
  - **Trades:** Mock data used; real integration would require API keys + actual broker APIs.
  - **Implemented Broker:** Only Zerodha adapter is implemented for demonstration.

