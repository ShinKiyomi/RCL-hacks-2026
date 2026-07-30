import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";

export async function GET() {
  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Read the test image and convert it to base64
  const imagePath = path.join(process.cwd(), "public", "test-receipt.jpg");
  const imageBuffer = readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");

  const response = await client.models.generateContent({
    model: "gemini-flash-latest",
    contents: [
      {
        role: "user",
        parts: [
          { text: "List every item and price you see on this receipt, as a simple list." },
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

  return NextResponse.json({ reply: response.text });
}