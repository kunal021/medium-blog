"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getDate, read } from "@/utils/date";
import parse from "html-react-parser";
import Loader from "@/components/Loader";
import SideBar from "@/components/SideBar";
import Comments from "@/components/Comments";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import ImageAndDate from "@/components/ImageAndDate";

function Blog({ params }: { params: any }) {
  const [postData, setPostData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

              try {
                const commentsResponse = await axios.get(
                  `/api/post/comment/get/bypostid?id=${post.id}`
                );
                const comments: Comment = commentsResponse.data.data;
                return { ...post, user, comments };
              } catch (error) {
                console.error(`Error fetching Comment`);
                return { ...post, user };
              }
            } catch (error) {
              console.error(
                `Error fetching user data for authorId ${post.authorId}`,
                error
              );
              return post;
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
    <div className="min-h-screen w-full text-xl md:text-3xl font-bold flex justify-center items-center">
      No Data Found
    </div>;
  }

  if (loading || postData.length === 0) {
    return <Loader />;
  }

  const firstPost = postData[0];

  return (
    <div className="flex">
      <div className="flex flex-col justify-start items-center h-full my-10 w-full">
        <div className="my-5 space-y-6 w-[90%]">
          <Button onClick={() => router.back()}>
            <ArrowLeftIcon />
          </Button>
          {firstPost.user && (
            <ImageAndDate
              content={read(firstPost.content)}
              image={firstPost.user.name[0]}
              name={firstPost.user.name}
              publishedAt={getDate(firstPost.publishedAt)}
            />
          )}
          <div className="z-10">
            {/* <SideBar
              postId={firstPost.id}
              numOfComments={firstPost.comments ? firstPost.comments.length : 0}
              likes={firstPost.likes}
            /> */}
          </div>
          <div className="text-3xl font-bold">{parse(firstPost.title)}</div>
          <div className="pb-5">{parse(firstPost.content)}</div>
        </div>
        {/* <Comments
          comment={
            firstPost.comments ? firstPost.comments : " No Comment Found"
          }
          postId={firstPost.id}
        /> */}
      </div>
    </div>
  );
}

export default Blog;
