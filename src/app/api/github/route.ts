import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubData } from "@/lib/github";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ success: false, error: "Username query parameter is mandatory." }, { status: 400 });
  }

  const result = await fetchGitHubData(username);

  if (!result.success) {
    return NextResponse.json({ success: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json(result, { status: 200 });
}