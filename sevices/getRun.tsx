export const getRuns = async (eventId: string) => {
  console.log("ankan", eventId);

  const response = await fetch(`http://127.0.0.1:8288/${eventId}/runs`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_INNGEST_SIGNING_KEY}`,
    },
  });

  const json = await response.json();

  console.log("CA", json);
  return json.data;
};
