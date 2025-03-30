export const GET = async () => {
  // This is a placeholder for the GET request.
  // In a real-world scenario, you would retrieve guestbook entries from a database.
  const response = new Response(JSON.stringify({ message: "Guestbook API" }), {
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

export const POST = async (request: Request) => {
  // This is a placeholder for the POST request.
  // In a real-world scenario, you would save the guestbook entry to a database.
  const data = await request.json();
  
  // Simulate saving the entry
  console.log("New guestbook entry:", data);

  const response = new Response(JSON.stringify({ message: "Entry saved!" }), {
    headers: { "Content-Type": "application/json" },
    status: 201, // Created
  });
  return response;
}

export const PUT = async (request: Request) => {
  // This is a placeholder for the PUT request.
  // In a real-world scenario, you would update an existing guestbook entry in a database.
  const data = await request.json();
  
  // Simulate updating the entry
  console.log("Updating guestbook entry:", data);

  const response = new Response(JSON.stringify({ message: "Entry updated!" }), {
    headers: { "Content-Type": "application/json" },
    status: 200, // OK
  });
  return response;
}