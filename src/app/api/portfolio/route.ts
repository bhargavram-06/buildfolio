import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// POST Route: Save or update a developer's generated portfolio
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, theme, githubData } = body;

    if (!username) {
      return NextResponse.json(
        { success: false, error: "Username is required to save data." },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection("portfolios");

    // Perform an upsert (Update if exists, Insert if it's new)
    const result = await collection.updateOne(
      { username: username.toLowerCase() },
      {
        $set: {
          username: username.toLowerCase(),
          theme: theme || "Silent Coder",
          githubData,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Portfolio successfully synchronized!" }, { status: 200 });
  } catch (error: any) {
    console.error("Database Save Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// GET Route: Fetch a portfolio by username query parameter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({ success: false, error: "Username parameter missing." }, { status: 400 });
    }

    const db = await connectToDatabase();
    const portfolio = await db.collection("portfolios").findOne({ username: username.toLowerCase() });

    if (!portfolio) {
      return NextResponse.json({ success: false, error: "Portfolio profile not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, portfolio }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}