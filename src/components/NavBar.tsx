import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { SquarePen } from "lucide-react";

async function HomeNavBar() {
  const session = await auth();
  const userId = session?.user.id;

  return (
    <div className="flex px-4 md:px-10 py-3 justify-between items-center border-b bg-white border-b-black sticky top-0 z-50">
      <div>
        <h1 className="text-base md:text-2xl font-black">MEDIUM-BLOG</h1>
      </div>
      {userId ? (
        <div className="flex justify-between items-center space-x-4 md:space-x-10">
          <Link href={"/post/create"} className="flex space-x-2">
            <SquarePen className="h-6 w-6" />
            <p className="text-base font-medium">Write</p>
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        </div>
      ) : (
        <div>
          <ul className="flex justify-between items-center space-x-4 md:space-x-10">
            <li>
              <Link href={"/signin"} className="text-sm md:text-lg font-medium">
                Sign In
              </Link>
            </li>
            <li className="text-sm md:text-lg font-medium rounded-full border-2 px-2 md:px-5 py-1 md:py-2 bg-black text-white border-transparent">
              <Link href={"/signup"}>Get Started</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HomeNavBar;
