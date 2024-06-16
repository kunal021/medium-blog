"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import axios from "axios";
import Link from "next/link";

function UserSignOut() {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/user/delete`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-full w-full">
      <div className="gap-3 flex flex-col justify-center items-center">
        <Link href={"/settings"} className="w-full border-b border-gray-500">
          <p className=" w-full text-gray-500 hover:underline">Profile</p>
        </Link>
        <p
          onClick={() => signOut()}
          className="w-full hover:underline border-b border-gray-500 cursor-pointer"
        >
          Sign Out
        </p>
        <p
          onClick={handleDelete}
          className="w-full text-red-500 hover:underline border-b border-gray-500 cursor-pointer"
        >
          Delete Account
        </p>
        {/* <Link href={"/settings/update"} className="w-full">
          <Button className="bg-green-700 hover:bg-green-600 w-full">
            Update Account
          </Button>
        </Link> */}
      </div>
    </div>
  );
}

export default UserSignOut;
