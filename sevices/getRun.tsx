export const getRuns = async (eventId: string) => {
  try {
    // Use the correct Inngest API endpoint
    const response = await fetch(`http://127.0.0.1:8288/v0/events/${eventId}/runs`, {
      headers: {
        Authorization: `Bearer ${process.env.INNGEST_SECRET_KEY || process.env.NEXT_PUBLIC_INNGEST_SIGNING_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check content type before parsing
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Expected JSON response");
    }

    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.error("Error fetching runs:", error);
    throw error;
  }
};
