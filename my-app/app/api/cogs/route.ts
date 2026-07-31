import { NextResponse } from "next/server";

interface Ingredient {
  name: string;
  price: number;
}

export async function POST(request: Request) {
  const body = await request.json();

  const ingredients: Ingredient[] = body.ingredients;
  const batchYield: number = body.batchYield; // how many cupcakes this batch makes

  if (!ingredients || !Array.isArray(ingredients) || !batchYield) {
    return NextResponse.json(
      { error: "Missing required fields: ingredients (array), batchYield (number)" },
      { status: 400 }
    );
  }

  const totalCost = ingredients.reduce((sum, item) => sum + item.price, 0);
  const costPerUnit = totalCost / batchYield;

  const suggestedPriceMin = costPerUnit * 2;
  const suggestedPriceMax = costPerUnit * 3;

  return NextResponse.json({
    totalBatchCost: parseFloat(totalCost.toFixed(2)),
    batchYield,
    costPerUnit: parseFloat(costPerUnit.toFixed(2)),
    suggestedPriceRange: {
      min: parseFloat(suggestedPriceMin.toFixed(2)),
      max: parseFloat(suggestedPriceMax.toFixed(2)),
    },
  });
}