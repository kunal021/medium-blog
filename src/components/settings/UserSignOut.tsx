"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import axios from "axios";

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
      <div className="w-[80%] space-y-5">
        <Button onClick={() => signOut()}>Sign Out</Button>
        <Button onClick={handleDelete} className="bg-red-700 hover:bg-red-500">
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default UserSignOut;
