"use client";

import Image from "next/image";
import svg from "../../public/undraw_content_creator_re_pt5b.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { getDate, truncateData, read } from "@/utils/date";
import Loader from "@/components/Loader";
import Link from "next/link";
import ImageAndDate from "./ImageAndDate";
import { Input } from "./ui/input";

export function LoggedOut() {
  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center h-[85vh]">
        <div className="flex flex-col justify-center items-start mx-8 sm:mx-14 md:mx-20 space-y-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black">
            Write stories & ideas, share it to the world.
          </h1>
          <p className="text-lg font-medium">
            A place to read, write, and deepen your understanding
          </p>
          <Link
            href={"/signup"}
            className="text-lg font-medium rounded-full border-2 px-10 py-2 bg-green-700 hover:bg-green-900 text-white border-transparent"
          >
            Get Started
          </Link>
        </div>
        <div className="hidden lg:flex justify-center items-center mx-20">
          <Image height={500} width={700} alt="logo" src={svg}></Image>
        </div>
      </div>
    </div>
  );
}

export function LoggedIn() {
  const [postData, setPostData] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPublishedPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/post/search?title=${search}`);
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
  }, [search]);

  return (
    <div className="w-full">
      <div className="flex flex-col justify-start items-center h-full my-5 w-full md:w-[60%]">
        <div className="w-[80%] mb-6">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>
        {loading && <Loader />}
        {!loading && postData.length === 0 && (
          <div className="min-h-screen w-full text-xl md:text-3xl font-bold flex justify-center items-center">
            No Blog Found
          </div>
        )}
        {!loading && postData.length > 0 && (
          <>
            {postData.map((data) => (
              <Link
                key={data.id}
                href={`/blog/${data.id}`}
                className="my-5 space-y-2 w-[80%]"
              >
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
                <hr className="w-full h-[1px] bg-gray-400"></hr>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
