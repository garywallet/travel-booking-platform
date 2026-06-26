export async function POST(request) {
  const body = await request.json();

  const response = await fetch(
    "https://api.duffel.com/air/offer_requests",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DUFFEL_API_TOKEN}`,
        "Duffel-Version": "v2",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  );

  const data = await response.json();

  return Response.json(data, {
    status: response.status
  });
}
