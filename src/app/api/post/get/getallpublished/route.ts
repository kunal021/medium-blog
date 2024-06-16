import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const allPosts = await prisma.posts.findMany({
      where: { published: true },
    });

    if (!allPosts) {
      return NextResponse.json(
        { message: "NO Data Founs", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Data Found", success: true, data: allPosts },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
