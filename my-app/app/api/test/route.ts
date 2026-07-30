import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function GET() {
  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const response = await client.models.generateContent({
   model: "gemini-flash-latest",
    contents: "Say hello in one short sentence.",
  });

  return NextResponse.json({ reply: response.text });
}