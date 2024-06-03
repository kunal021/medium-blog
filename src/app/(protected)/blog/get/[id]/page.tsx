"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getDate, truncateData } from "@/utils/date";
import parse from "html-react-parser";
import Loader from "@/components/Loader";

function Blog({ params }: { params: any }) {
  const [postData, setPostData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  // console.log(params.id);

  useEffect(() => {
    const getPublishedPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/post/get/byid/${decodeURIComponent(params.id)}`
        );
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
  }, [params.id]);

  if (!loading && postData.length === 0) {
    return <div>No Blog Found</div>;
  }

  if (loading || postData.length === 0) {
    return <Loader />;
  }

  const firstPost = postData[0];

  return (
    <div>
      <div className="flex flex-col justify-start items-center h-full my-10 w-full">
        <div className="my-5 space-y-6 w-[70%]">
          {firstPost.user && (
            <div className="flex justify-start items-center space-x-1 font-medium text-sm">
              <div className="flex justify-center items-center bg-gray-400 border-[1px] h-6 w-6 rounded-full border-transparent">
                {firstPost.user.name[0]}
              </div>
              <p>{firstPost.user.name}</p>
              <span>·</span>
              <p>{getDate(firstPost.publishedAt)}</p>
            </div>
          )}
          <div className="text-3xl font-bold">{parse(firstPost.title)}</div>
          <div className="pb-5">{parse(firstPost.content)}</div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
