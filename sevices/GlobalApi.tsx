export const RunStatus = async (eventId: string) => {
  console.log("ankan", eventId);

  const response = await fetch(process.env.NEXT_PUBLIC_INNGEST_SERVER_URL + `/${eventId}/runs`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_INNGEST_SIGINING_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch run status: ${response.statusText}`);
  }
  const result = await response.json();

  console.log("CA", result);
  return result.data;
};
