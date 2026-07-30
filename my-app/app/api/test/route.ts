import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const formData = await request.formData();
  const file = formData.get("receipt") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const base64Image = Buffer.from(bytes).toString("base64");

  const response = await client.models.generateContent({
    model: "gemini-flash-latest",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Read this receipt and return ONLY valid JSON, no other text, no markdown formatting, in exactly this shape:
{
  "items": [
    { "name": "string", "quantity": number, "price": number }
  ],
  "total": number
}`,
          },
          {
            inlineData: {
              mimeType: file.type,
              data: base64Image,
            },
          },
        ],
      },
    ],
  });

  const rawText = response.text ?? "";
  const cleaned = rawText.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned);
    return NextResponse.json(parsed);
  } catch (err) {
    return NextResponse.json({ error: "Could not parse JSON", raw: rawText });
  }
}