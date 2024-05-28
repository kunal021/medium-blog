import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const jwtSecret = process.env.JWT_SECRET!;
const prisma = new PrismaClient();

const userSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid Email"),
  password: z.string({ required_error: "Password is required" }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { success, data } = userSchema.safeParse(body);

    if (!success || !data) {
      return NextResponse.json(
        { error: "Email and Password reqired" },
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    const verifyPassword = await bcrypt.compare(data.password, user.password);

    if (!verifyPassword) {
      return NextResponse.json({ error: "Wrong Credentials" }, { status: 400 });
    }

    const token = sign({ userId: user.id }, jwtSecret, { expiresIn: "1d" });

    const response = NextResponse.json(
      {
        message: "Logged In Sucessfully",
        success: true,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, { httpOnly: true, secure: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
