import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const postTitle = req.nextUrl.searchParams.get("title");

    console.log(postTitle);

    let posts;

    if (postTitle) {
      posts = await prisma.posts.findMany({
        where: { title: { contains: postTitle }, published: true },
      });
    } else {
      posts = await prisma.posts.findMany({
        where: { published: true },
      });
    }

    if (!posts) {
      return NextResponse.json(
        { message: "NO Data Founs", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Data Found", success: true, data: posts },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
