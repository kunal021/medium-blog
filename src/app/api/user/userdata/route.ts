import { getJwtTokenData } from "@/utils/getJwtTokenData";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const userId = await getJwtTokenData(req);

    const user = await prisma.users.findUnique({ where: { id: userId } });

    return NextResponse.json(
      { message: "Data Found", success: true, data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
