import { getJwtTokenData } from "@/utils/getJwtTokenData";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { delete: string } }
) {
  try {
    getJwtTokenData(req);
    const id = params.delete;

    const deleteComment = await prisma.comments.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Deleted Successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
