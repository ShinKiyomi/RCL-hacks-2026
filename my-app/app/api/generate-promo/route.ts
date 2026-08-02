import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const body = await request.json();
  const inventory = body.inventory || [];

  const inventoryList = inventory.map((i: any) => i.name).join(", ") || "cupcakes";

  const response = await client.models.generateContent({
    model: "gemini-flash-latest",
    contents: `You are a marketing assistant for a home bakery called BakeWise. 
Based on these ingredients currently in stock: ${inventoryList}, 
write ONE short, catchy promotional flash-deal message (under 25 words) to encourage customers to order cupcakes this week. 
Include an emoji. Return ONLY the message text, nothing else, no quotes.`,
  });

  const message = response.text?.trim() || "Flash Deal! Order cupcakes today! 🧁";

  return NextResponse.json({ message });
}