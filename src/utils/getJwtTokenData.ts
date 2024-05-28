import { verify } from "jsonwebtoken";
import { NextRequest } from "next/server";

const jwtSecret = process.env.JWT_SECRET!;

export function getJwtTokenData(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";

    const decodedToken: any = verify(token, jwtSecret);

    return decodedToken.userId;
  } catch (error) {
    throw new Error("Please Log In");
  }
}
