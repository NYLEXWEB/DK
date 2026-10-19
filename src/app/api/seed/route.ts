import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/db-services";

export async function POST() {
  try {
    const result = await seedDatabase();
    return NextResponse.json({
      success: true,
      message: "Database seed executed successfully",
      result,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
