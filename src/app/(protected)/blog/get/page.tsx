"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";
import { getDate, truncateData } from "@/utils/date";
import Loader from "@/components/Loader";
import Link from "next/link";

function AllPost() {
  const [postData, setPostData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPublishedPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/post/get/getallpublished");
        const posts: Post[] = response.data.data;

        // Fetch user data for each authorId
        const updatedPosts = await Promise.all(
          posts.map(async (post) => {
            try {
              const userResponse = await axios.get(
                `/api/user/userdata?userId=${post.authorId}`
              );
              const user: User = userResponse.data.data;
              return { ...post, user }; // Merge user data with the post
            } catch (error) {
              console.error(
                `Error fetching user data for authorId ${post.authorId}`,
                error
              );
              return post; // Return the post as is if user fetch fails
            }
          })
        );

        setPostData(updatedPosts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPublishedPost();
  }, []);

  if (postData.length == 0 && loading == false) {
    return <div>No Blog Found</div>;
  }

  if (loading || postData.length === 0) {
    return <Loader />;
  }

  return (
    <div className=" w-full">
      <div className="flex flex-col justify-start items-center h-full my-10 w-[60%]">
        <p className="text-3xl font-black w-[80%] mb-2">All Blogs</p>
        {postData.map((data) => (
          <Link
            key={data.id}
            href={`/blog/get/${data.id}`}
            className="my-5 space-y-2 w-[80%]"
          >
            <div className="flex justify-start items-center space-x-1 font-medium text-sm">
              <div className=" flex justify-center items-center bg-gray-400 border-[1px] h-6 w-6 rounded-full border-transparent">
                {data.user?.name[0]}
              </div>
              <p>{data.user?.name}</p>
              <span>·</span>
              <p>{getDate(data.publishedAt)}</p>
            </div>
            <div className="text-xl font-bold">
              {parse(truncateData(data.title, 20))}
            </div>
            <div className="pb-5">{parse(truncateData(data.content, 50))}</div>
            <hr className="w-full h-[1px] bg-gray-400"></hr>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllPost;
