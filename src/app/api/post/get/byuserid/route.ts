import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userid = searchParams.get("userid");
    if (!userid) {
      return NextResponse.json(
        { message: "No Post Found With This User ID", success: false },
        { status: 400 }
      );
    }
    const userPosts = await prisma.posts.findMany({
      where: { authorId: userid },
    });

    if (!userPosts) {
      return NextResponse.json(
        { message: "No Post Found", success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Data Found", success: true, data: userPosts },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
