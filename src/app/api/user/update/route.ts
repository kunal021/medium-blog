import { getJwtTokenData } from "@/utils/getJwtTokenData";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
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

    const userId = await getJwtTokenData(req);

    const user = await prisma.users.update({
      where: { id: userId },
      data: { firstName: data.firstName, lastName: data.lastName },
    });

    return NextResponse.json(
      { message: "Updated Sucessfully", success: true, data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
