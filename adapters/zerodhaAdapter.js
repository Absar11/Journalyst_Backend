class ZerodhaAdapter {
  async fetchTrades(token) {
    console.log(`[zerodhaAdapter] Fetching trades with token: ${token}`);
    return [
      { tradingsymbol: "TCS", qty: 2, price: 3500, timestamp: "2025-10-01T10:00:00Z" },
      { tradingsymbol: "INFY", qty: 5, price: 1500, timestamp: "2025-10-01T11:00:00Z" }
    ];
  }
}

module.exports = ZerodhaAdapter;
