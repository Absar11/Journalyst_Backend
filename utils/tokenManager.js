class TokenManager {
  constructor() {
    this.tokenStore = new Map();
  }

  setToken(userId, token) {
    this.tokenStore.set(userId, token);
  }

  getToken(userId) {
    return this.tokenStore.get(userId);
  }

  isExpired(token) {
    return Date.now() >= token.expiresAt;
  }

  async refreshToken(userId) {
    const existing = this.tokenStore.get(userId);
    if (!existing) throw new Error("No token found for user");

    await new Promise((r) => setTimeout(r, 200));

    const newToken = {
      accessToken: `access-${userId}-${Math.random().toString(36).slice(2, 8)}`,
      expiresAt: Date.now() + 30 * 1000,
      refreshToken: existing.refreshToken,
    };

    this.tokenStore.set(userId, newToken);
    return newToken;
  }

  async ensureValidToken(userId) {
    let token = this.tokenStore.get(userId);
    if (!token) throw new Error("User has not connected broker account");
    if (this.isExpired(token)) token = await this.refreshToken(userId);
    return token;
  }
}

module.exports = new TokenManager();
