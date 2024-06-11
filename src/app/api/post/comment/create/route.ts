import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const prisma = new PrismaClient();

const userSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
});

export async function POST(req: NextRequest) {
  try {
    // console.log(params);
    const session = await auth();
    const userId = session?.user.id;

    if (userId) {
      const body = await req.json();
      const { success, data } = userSchema.safeParse(body);

      if (!success || !data) {
        return NextResponse.json({ error: "Title reqired" }, { status: 400 });
      }

      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
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
    } else {
      return;
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
