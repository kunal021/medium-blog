import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const userSchema = z.object({
  name: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { success, data } = userSchema.safeParse(body);

    if (!success || !data) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const session = await auth();
    const userId = session?.user.id;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { name: data.name },
    });

    return NextResponse.json(
      { message: "Updated Sucessfully", success: true, data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
