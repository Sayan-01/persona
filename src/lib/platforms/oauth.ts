import { PlatformHelper } from "../../../types";

const APP_URL = process.env.NEXT_PUBLIC_URL_NGROK;

export const xHelper: PlatformHelper = {
    getAuthUrl: (state: string) => {
        const rootUrl = `https://twitter.com/i/oauth2/authorize`
        const options = {
          response_type: "code",
          client_id: process.env.TWITTER_CLIENT_ID!,
          redirect_uri: `${APP_URL}/api/oauth/twitter/callback`,
          scope: "tweet.read users.read tweet.write offline.access",
          state,
          code_challenge: "challenge",
          code_challenge_method: "plain", // Using plain for now to match the hardcoded verifier
        };
        const qs = new URLSearchParams(options).toString();
        return `${rootUrl}?${qs}`;
    },
    exchangeCode: async (code: string, codeVerifier?: string) => {
        const tokenResponse = await fetch("https://api.twitter.com/2/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString("base64")}`,
            },
            body: new URLSearchParams({
                code,
                grant_type: "authorization_code",
                code_verifier: "challenge",
                redirect_uri: `${APP_URL}/api/oauth/twitter/callback`,
            }),
        });

        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.json();
            throw new Error(`Failed to exchange code: ${JSON.stringify(errorData)}`);
        }

        const tokenData = await tokenResponse.json();
        
        const userRes = await fetch("https://api.twitter.com/2/users/me?user.fields=profile_image_url", {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });
        const userData = await userRes.json();

        if (!userData.data) {
          throw new Error("Failed to fetch user data");
        }

        return {
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          expiresAt: Math.floor(Date.now() / 1000) + tokenData.expires_in,
          accountHandle: userData.data.username,
          accountName: userData.data.name,
          providerAccountId: userData.data.id,
          accountImage: userData.data.profile_image_url,
        }
    },
    refreshToken: async (refreshToken: string) => {
        const response = await fetch("https://api.twitter.com/2/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString("base64")}`,
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                client_id: process.env.TWITTER_CLIENT_ID!,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to refresh token: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        
        return {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresAt: Math.floor(Date.now() / 1000) + data.expires_in,
        };
    }
}
