
const userTokens = {};  

async function refreshToken(userId) {
  console.log(`[tokenManager] Refreshing token for user ${userId}...`);
  return new Promise(resolve => {
    setTimeout(() => {
      const newToken = "new_token_" + Date.now();
      userTokens[userId] = {
        token: newToken,
        expiry: Date.now() + 60 * 1000,  
        refreshing: false
      };
      resolve(newToken);
    }, 1000);
  });
}

async function getValidToken(userId) {
  const data = userTokens[userId];

  if (!data) {
    return await refreshToken(userId);
  }

  if (Date.now() < data.expiry) {
    return data.token;
  }

  if (data.refreshing) {
    console.log(`[tokenManager] Waiting for ongoing refresh...`);
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (!userTokens[userId].refreshing) {
          clearInterval(interval);
          resolve(userTokens[userId].token);
        }
      }, 100);
    });
  }

  userTokens[userId].refreshing = true;
  return await refreshToken(userId);
}

module.exports = { getValidToken };
