import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json({ error: "No User Found" }, { status: 404 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    // const { action } = await req.json();

    const post = await prisma.posts.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    let updateLikes;

    let likedBy = post.likedBy;

    if (!likedBy.includes(userId)) {
      likedBy.push(userId);
      updateLikes = await prisma.posts.update({
        where: {
          id: Number(id),
        },
        data: {
          likes: post.likes + 1,
          likedBy: likedBy,
        },
      });
    } else if (likedBy.includes(userId)) {
      likedBy = likedBy.filter((id) => id !== userId);
      updateLikes = await prisma.posts.update({
        where: {
          id: Number(id),
        },
        data: {
          likes: post.likes - 1,
          likedBy: likedBy,
        },
      });
    } else {
      return NextResponse.json(
        { error: "Invalid action or state" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updateLikes,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
