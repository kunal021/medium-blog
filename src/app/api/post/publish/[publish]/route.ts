import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getJwtTokenData } from "@/utils/getJwtTokenData";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { publish: string } }
) {
  try {
    const userId = await getJwtTokenData(req);

    const id = params.publish;

    const post = await prisma.posts.update({
      where: {
        id: Number(id),
        authorId: userId,
      },
      data: {
        published: true,
      },
    });

    return NextResponse.json(
      {
        message: "Post Published Successfully",
        success: true,
        data: post.published,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
