interface FacebookPostResponse {
  id: string;
  post_id: string;
}

export async function postToFacebook(content: string, accessToken: string): Promise<FacebookPostResponse> {
  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/me/feed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: content,
        access_token: accessToken,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Facebook post failed:", error);
    throw new Error("Failed to post to Facebook");
  }
}
