import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const userSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid Email"),
  firstName: z.string({ required_error: "Firstname is required" }),
  lastName: z.string({ required_error: "Lastname is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
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

    const existingUser = await prisma.users.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.users.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashedPassword,
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
