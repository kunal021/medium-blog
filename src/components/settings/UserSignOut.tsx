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
        <p className="text-base font-medium md:text-xl md:font-bold">
          Account Seetings
        </p>
        <Button onClick={() => signOut()} className="w-full">
          Sign Out
        </Button>
        <Button
          onClick={handleDelete}
          className="bg-red-700 hover:bg-red-600 w-full"
        >
          Delete Account
        </Button>
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
