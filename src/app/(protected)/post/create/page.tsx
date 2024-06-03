"use client";
import Tiptap from "@/components/TextEditor";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { any } from "zod";
import toast from "react-hot-toast";

function Editor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleTitleData = (html: any) => {
    setTitle(html);
  };

  const handleContentData = (html: any) => {
    setContent(html);
  };

  const handlePost = async (published: boolean) => {
    try {
      const response = await axios.post("/api/post/create", {
        title: title,
        content: content,
        published: published,
      });

      if (response.status === 200) {
        if (published === true) {
          toast.success("Post Published Successfully");
        } else {
          toast.success("Post saved as draft");
        }
      }
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4 my-10">
      <div className=" h-[100px] w-[80%] my-10">
        <Tiptap placeholder="Title Here..." getHtmlData={handleTitleData} />
      </div>
      <div className=" h-[450px] w-[80%] my-10">
        <Tiptap placeholder="Content Here..." getHtmlData={handleContentData} />
      </div>
      <div className="flex justify-between items-center w-[75%]">
        <Button
          onClick={() => handlePost(true)}
          className="bg-green-500 hover:bg-green-700 text-sm md:text-lg rounded-full"
        >
          Publish
        </Button>
        <Button
          onClick={() => handlePost(false)}
          className="bg-red-500 hover:bg-red-700 text-sm md:text-lg rounded-full"
        >
          Save as draft
        </Button>
      </div>
    </div>
  );
}

export default Editor;
