import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Basic validation
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

  // TODO: later, this is where we'd call Faye's Webhook URL
  // await fetch(process.env.FAYE_WEBHOOK_URL, {
  //   method: "POST",
  //   body: JSON.stringify(dispatchPayload),
  // });

  return NextResponse.json({
    status: "success",
    dispatched: dispatchPayload,
  });
} 