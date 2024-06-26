import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/utils/userData";

const prisma = new PrismaClient();

const userSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid Email"),
  name: z.string({ required_error: "Name is required" }),
  hashedPassword: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be atleast 8 characters")
    .max(32, "Password must be less than 32 characters"),
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

    const existingUser = await getUserByEmail(data.email);

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const password = await bcrypt.hash(data.hashedPassword, 10);
    const users = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        hashedPassword: password,
      },
    });

    return NextResponse.json(
      { message: "Account created sucessfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
