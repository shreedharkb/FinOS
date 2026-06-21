import { seedTransactions } from "@backend/actions/seed";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await seedTransactions();
  return NextResponse.json(result);
}
