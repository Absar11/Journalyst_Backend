const { getValidToken } = require("./tokenManager");
const ZerodhaAdapter = require("../adapters/zerodhaAdapter");
const { normalizeZerodhaTrades } = require("../utils/normalizer");

async function syncTrades(userId, brokerName) {
  try {
    const token = await getValidToken(userId);
    let trades = [];

    if (brokerName === "zerodha") {
      const adapter = new ZerodhaAdapter();
      const rawTrades = await adapter.fetchTrades(token);
      trades = normalizeZerodhaTrades(rawTrades);
    } else {
      throw new Error("Broker not supported yet");
    }

    return trades;
  } catch (err) {
    console.error("Error in syncTrades:", err.message);
    throw err;
  }
}

module.exports = { syncTrades };
