
type Token = {
  accessToken: string;
  expiresAt: number;   
  refreshToken?: string;
};

const tokenStore: Map<string, Token> = new Map();

const now = () => Date.now();

export function setToken(userId: string, token: Token) {
  tokenStore.set(userId, token);
}

export function getToken(userId: string): Token | undefined {
  return tokenStore.get(userId);
}

export function isExpired(token: Token): boolean {
  return now() >= token.expiresAt;
}

export async function refreshToken(userId: string): Promise<Token> {
  const existing = tokenStore.get(userId);
  if (!existing) throw new Error("No token found for user");

  await new Promise((r) => setTimeout(r, 200));

  const newToken: Token = {
    accessToken: `access-${userId}-${Math.random().toString(36).slice(2, 8)}`,
    expiresAt: now() + 30 * 1000, 
    refreshToken: existing.refreshToken,
  };

  tokenStore.set(userId, newToken);
  return newToken;
}

export async function ensureValidToken(userId: string): Promise<Token> {
  let token = tokenStore.get(userId);
  if (!token) throw new Error("User has not connected broker account");

  if (isExpired(token)) {
    token = await refreshToken(userId);
  }

  return token;
}
