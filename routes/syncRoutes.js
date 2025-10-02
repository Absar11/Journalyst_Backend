const express = require("express");
const { syncTrades } = require("../services/syncService");

const router = express.Router();

router.get("/sync/:userId/:broker", async (req, res) => {
  try {
    const { userId, broker } = req.params;
    const trades = await syncTrades(userId, broker);
    res.json({ success: true, trades });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
