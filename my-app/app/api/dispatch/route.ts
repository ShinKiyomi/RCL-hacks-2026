import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.item || !body.price) {
    return NextResponse.json(
      { error: "Missing required fields: item, price" },
      { status: 400 }
    );
  }

  const dispatchPayload = {
    item: body.item,
    price: body.price,
    pickupTime: body.pickupTime || "TBD",
    quantityAvailable: body.quantityAvailable || null,
    message: body.message || `Flash Deal! Order ${body.item} now for pickup.`,
    dispatchedAt: new Date().toISOString(),
  };

  // Send to Faye's n8n webhook
  try {
    await fetch("https://fayesia.app.n8n.cloud/webhook/8e3c65bd-2436-4909-b5d9-5ceb6dfa3ab7", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dispatchPayload),
    });
  } catch (err) {
    console.error("Failed to reach n8n webhook:", err);
  }

  return NextResponse.json({
    status: "success",
    dispatched: dispatchPayload,
  });
}