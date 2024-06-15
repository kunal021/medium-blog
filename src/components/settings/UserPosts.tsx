"use client";

import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ImageAndDate from "../ImageAndDate";
import { getDate, read, truncateData } from "@/utils/date";
import parse from "html-react-parser";
import Loader from "../Loader";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const fetchPost = async (
  userId: string,
  setLoading: any,
  setUserPosts: any
) => {
  try {
    setLoading({ common: true, del: false });
    const response = await axios.get(`api/post/get/byuserid?userid=${userId}`);
    setUserPosts(response.data.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading({ common: false, del: false });
  }
};

function UserPosts() {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState({
    common: false,
    del: false,
  });

  const session = useSession();
  const userId = useMemo(() => session?.data?.user.id, [session]);
  useEffect(() => {
    if (!userId) return;
    fetchPost(userId, setLoading, setUserPosts);
  }, [userId]);

  const handleDelete = async (id: number) => {
    try {
      setLoading({ del: true, common: false });
      const response = await axios.delete(`/api/post/delete?id=${id}`);
      if (response.status === 200) {
        toast.success("Post Deleted Successfully");
      }
      fetchPost(userId!, setLoading, setUserPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading({ del: false, common: false });
    }
  };

  // const handleUpdate = async (id: number) => {
  //   try {
  //     const response = await axios.delete(`/api/post/delete?id=${id}`);
  //     if (response.status === 200) {
  //       toast.success("Post Deleted Successfully");
  //     }
  //     fetchPost(userId!, setLoading, setUserPosts);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (userPosts.length === 0 && !loading.common) {
    return (
      <div className="min-h-screen w-full text-xl md:text-3xl font-bold flex justify-center items-center">
        No Blog Found
      </div>
    );
  }

  if (loading.del) {
    return (
      <div className="flex flex-col space-x-2 justify-center items-center m-10">
        <Loader2 className="animate-spin font-black h-8 w-8" />
        <p>Deleting...</p>
      </div>
    );
  }

  console.log(loading.del);

  // if (loading || UserPosts.length === 0) {
  //   return <Loader />;
  // }
  return (
    <div className="h-full w-full">
      <div className="flex flex-col justify-start items-center h-full my-10 w-full md:w-[60%]">
        {userPosts.map((data) => (
          <div key={data.id} className="my-5 space-y-2 w-[80%]">
            <Link href={`/blog/${data.id}`}>
              <ImageAndDate
                content={read(data.content)}
                image={data.user?.name[0]}
                name={data.user?.name}
                publishedAt={getDate(data.publishedAt)}
              />
              <div className="text-lg md:text-xl font-bold">
                {parse(truncateData(data.title, 20))}
              </div>
              <div className="pb-5 text-sm md:text-base">
                {parse(truncateData(data.content, 50))}
              </div>
            </Link>
            <div>
              <button
                onClick={() => handleDelete(data.id)}
                className="underline text-gray-500"
              >
                Delete
              </button>
            </div>
            <hr className="w-full h-[1px] bg-gray-400"></hr>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPosts;
