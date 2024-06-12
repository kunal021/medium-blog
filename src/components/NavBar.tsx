import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { SquarePen } from "lucide-react";

async function HomeNavBar() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex px-4 md:px-10 py-3 justify-between items-center border-b bg-white border-b-black sticky top-0 z-50">
      <div>
        <Link href={"/"} className="text-base md:text-2xl font-black">
          MEDIUM-BLOG
        </Link>
      </div>
      {user?.id ? (
        <div className="flex justify-between items-center space-x-4 md:space-x-6">
          <Link href={"/post/create"} className="flex space-x-2">
            <SquarePen className="h-6 w-6" />
            <p className="hidden md:block text-base font-medium">Write</p>
          </Link>
          <div className="relative group z-20">
            <Link
              href={"/settings"}
              className="flex justify-center items-center bg-gray-400 border-[1px] h-8 w-8 rounded-full border-transparent font-bold"
            >
              {user.name?.charAt(0)}
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
              className="hidden group-hover:block absolute top-8 -left-6"
            >
              <Button type="submit" className="group-hover:block">
                Sign Out
              </Button>
            </form>
          </div>
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
