import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";

export async function GET() {
  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const imagePath = path.join(process.cwd(), "public", "test-receipt.jpg");
  const imageBuffer = readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");

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
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
        ],
      },
    ],
  });

  // Clean up in case Gemini wraps it in markdown code fences
  const rawText = response.text ?? "";
  const cleaned = rawText.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned);
    return NextResponse.json(parsed);
  } catch (err) {
    return NextResponse.json({ error: "Could not parse JSON", raw: rawText });
  }
}