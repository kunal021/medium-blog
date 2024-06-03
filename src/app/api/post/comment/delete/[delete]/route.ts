import { auth } from "@/auth";
import { getJwtTokenData } from "@/utils/getJwtTokenData";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { delete: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (userId) {
      const id = params.delete;

      const deleteComment = await prisma.comments.delete({
        where: { id: Number(id) },
      });

      return NextResponse.json(
        { message: "Deleted Successfully", success: true },
        { status: 200 }
      );
    } else {
      return null;
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
