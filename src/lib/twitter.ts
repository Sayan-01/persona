interface TwitterPostResponse {
  data: {
    id: string;
    text: string;
  };
}

export async function postToTwitter(content: string, accessToken: string): Promise<TwitterPostResponse> {
  try {
    const response = await fetch(`https://api.twitter.com/2/tweets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: content.substring(0, 280), // Twitter character limit
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Twitter API error details:", errorData);
      throw new Error(`Twitter API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Twitter post failed:", error);
    throw new Error("Failed to post to Twitter");
  }
}
