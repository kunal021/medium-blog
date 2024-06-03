import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { delete: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const id = params.delete;

    const comment = await prisma.comments.deleteMany({
      where: { postsId: Number(id) },
    });

    const post = await prisma.posts.delete({
      where: {
        id: Number(id),
        authorId: userId,
      },
    });

    return NextResponse.json(
      {
        message: "Post Deleted Successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
