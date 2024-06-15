"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ImageAndDate from "../ImageAndDate";
import { getDate, read, truncateData } from "@/utils/date";
import parse from "html-react-parser";
import Loader from "../Loader";
import toast from "react-hot-toast";

const fetchPost = async (
  userId: string,
  setLoading: any,
  setUserPosts: any
) => {
  try {
    setLoading((prevLoading: any) => ({ ...prevLoading, common: true }));
    const response = await axios.get(`api/post/get/byuserid?userid=${userId}`);
    setUserPosts(response.data.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading((prevLoading: any) => ({ ...prevLoading, common: false }));
  }
};

function UserPosts() {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState({
    common: false,
    del: {} as { [key: number]: boolean },
    pub: {} as { [key: number]: boolean },
  });

  const session = useSession();
  const userId = session?.data?.user.id;
  useEffect(() => {
    if (!userId) return;
    fetchPost(userId, setLoading, setUserPosts);
  }, [userId]);

  const handleDelete = async (id: number) => {
    try {
      setLoading((prevLoading) => ({
        ...prevLoading,
        del: { ...prevLoading.del, [id]: true },
      }));
      const response = await axios.delete(`/api/post/delete?id=${id}`);
      if (response.status === 200) {
        toast.success("Post Deleted Successfully");
      }
      fetchPost(userId!, setLoading, setUserPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevLoading) => ({
        ...prevLoading,
        del: { ...prevLoading.del, [id]: false },
      }));
    }
  };

  const handlePublish = async (id: number) => {
    try {
      setLoading((prevLoading) => ({
        ...prevLoading,
        pub: { ...prevLoading.pub, [id]: true },
      }));
      const response = await axios.patch(`/api/post/publish?id=${id}`);
      if (response.status === 200) {
        toast.success("Post Published Successfully");
      }
      fetchPost(userId!, setLoading, setUserPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevLoading) => ({
        ...prevLoading,
        pub: { ...prevLoading.pub, [id]: false },
      }));
    }
  };

  if (userPosts.length === 0 && !loading.common) {
    return (
      <div className="min-h-screen w-full text-xl md:text-3xl font-bold flex justify-center items-center">
        No Blog Found
      </div>
    );
  }

  if (loading.common || userPosts.length === 0) {
    return <Loader />;
  }
  console.log(userPosts);
  return (
    <div className="h-full w-full">
      <div className="flex flex-col justify-start items-center h-full my-10 w-full md:w-[80%]">
        {userPosts.map((data) => (
          <div key={data.id} className="my-5 space-y-2 w-[80%]">
            <Link href={`/blog/${data.id}`}>
              <ImageAndDate
                content={read(data.content)}
                image={session.data?.user.name?.charAt(0)!}
                name={session.data?.user.name!}
                publishedAt={getDate(data.publishedAt)}
              />
              <div className="text-lg md:text-xl font-bold">
                {parse(truncateData(data.title, 20))}
              </div>
              <div className="pb-5 text-sm md:text-base">
                {parse(truncateData(data.content, 50))}
              </div>
            </Link>
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleDelete(data.id)}
                className="underline text-red-500"
              >
                {loading.del[data.id] ? "Deleting..." : "Delete"}
              </button>

              {!data.published && (
                <button
                  onClick={() => handlePublish(data.id)}
                  className="underline text-green-500"
                >
                  {loading.pub[data.id] ? "Publishing..." : "Publish"}
                </button>
              )}
            </div>
            <hr className="w-full h-[1px] bg-gray-400"></hr>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPosts;
