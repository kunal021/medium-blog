"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import UserSignOut from "./settings/UserSignOut";

function HomeNavBar() {
  const session = useSession();
  const user = session?.data?.user;
  const [userIconOpen, setUserIconOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setUserIconOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <div ref={dropdownRef} className="relative group z-20">
            <div
              onClick={() => setUserIconOpen((prev) => !prev)}
              className="flex justify-center items-center bg-gray-400 border-[1px] h-8 w-8 rounded-full border-transparent font-bold cursor-pointer"
            >
              {user.name?.charAt(0)}
            </div>
            <div
              className={`${
                !userIconOpen ? "hidden" : "block"
              } absolute top-11 -left-32 md:-left-[105px] w-44 border bg-white rounded-b-md p-2 border-gray-500 z-50`}
            >
              {<UserSignOut />}
            </div>
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
