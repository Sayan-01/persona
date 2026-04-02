import { db } from "@/lib/db";
import { xHelper } from "./oauth";
import { PlatformHelper } from "../../../types";

const helpers: Record<string, PlatformHelper> = {
  twitter: xHelper,
};

export async function ensureValidToken(accountId: string) {
  const account = await db.account.findUnique({
    where: { id: accountId },
  });

  if (!account || !account.refreshToken || !account.expiresAt) {
    throw new Error("Account not found or no refresh token available");
  }

  const now = Math.floor(Date.now() / 1000);
  
  // If token is still valid (with 5 minute buffer), return it
  if (account.expiresAt > now + 300 && account.accessToken) {
    return account.accessToken;
  }

  // Token is expired or about to expire, refresh it
  const helper = helpers[account.platform];
  if (!helper) {
    throw new Error(`No helper found for platform: ${account.platform}`);
  }

  try {
    const tokens = await helper.refreshToken(account.refreshToken);
    
    // Update database with new tokens
    await db.account.update({
      where: { id: accountId },
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt,
      },
    });

    return tokens.accessToken;
  } catch (error) {
    console.error(`Failed to refresh token for account ${accountId}:`, error);
    
    // If refresh fails, we might want to clear tokens and notify user
    // to re-connect their account
    await db.account.update({
      where: { id: accountId },
      data: {
        accessToken: null,
        // We might keep the refresh token or clear it depending on the error
        // For now, let's just clear the access token so the UI shows it as disconnected/reconnect needed
      },
    });
    
    throw new Error("Session expired. Please reconnect your account.");
  }
}
