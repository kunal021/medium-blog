import { getJwtTokenData } from "@/utils/getJwtTokenData";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { like: string } }
) {
  try {
    const userId = getJwtTokenData(req);
    const id = params.like;
    const { action } = await req.json();

    const post = await prisma.posts.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    let updateLikes;

    let likedBy = post.likedBy;

    if (action === "like" && !likedBy.includes(userId)) {
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
    } else if (action === "unlike" && likedBy.includes(userId)) {
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
        message: action === "like" ? "Liked" : "Unliked",
        success: true,
        data: updateLikes,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
