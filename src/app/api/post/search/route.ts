import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const postTitle = req.nextUrl.searchParams.get("title");

    console.log(postTitle);

    if (!postTitle) {
      return NextResponse.json(
        { error: "No post found with this title" },
        { status: 400 }
      );
    }

    const allPosts = await prisma.posts.findMany({
      where: { title: { contains: postTitle }, published: true },
    });

    return NextResponse.json(
      { message: "Data Found", success: true, data: allPosts },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
