function normalizeZerodhaTrades(rawTrades) {
  return rawTrades.map(t => ({
    symbol: t.tradingsymbol,
    quantity: t.qty,
    price: t.price,
    timestamp: new Date(t.timestamp).toISOString()
  }));
}

module.exports = { normalizeZerodhaTrades };
