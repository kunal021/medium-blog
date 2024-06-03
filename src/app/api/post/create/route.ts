import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";

const prisma = new PrismaClient();

const postSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  content: z.string({ required_error: "Content is required" }),
  published: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { success, data } = postSchema.safeParse(body);

    if (!success || !data) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const session = await auth();
    const userId = session?.user.id;

    const userEmail = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!userEmail) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    const post = await prisma.posts.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        author: { connect: { email: userEmail.email } },
      },
    });

    return NextResponse.json(
      { message: "Post Created Successfully", success: true, data: post },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
