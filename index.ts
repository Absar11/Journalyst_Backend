import express from "express";
import syncRouter from "./routes/syncRoute";

import { tokenManager } from "./utils/tokenManager";

tokenManager.setToken("ravi", {
  accessToken: "access-ravi-xyz123",
  refreshToken: "refresh-ravi-abc456",
  expiresAt: Date.now() + 60 * 1000
});



const app = express();
app.use(express.json());

// Register sync route
app.use("/sync", syncRouter);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`Journalyst broker sync service running on http://localhost:${PORT}`);
});
