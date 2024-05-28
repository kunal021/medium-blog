import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { getJwtTokenData } from "@/utils/getJwtTokenData";

const prisma = new PrismaClient();

const userSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { comment: string } }
) {
  try {
    getJwtTokenData(req);

    const body = await req.json();
    const { success, data } = userSchema.safeParse(body);

    if (!success || !data) {
      return NextResponse.json({ error: "Title reqired" }, { status: 400 });
    }

    const id = params.comment;

    const comment = await prisma.comments.create({
      data: { title: data.title, Posts: { connect: { id: Number(id) } } },
    });

    return NextResponse.json(
      {
        message: "Commented Sucessfully",
        success: true,
        data: comment,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
