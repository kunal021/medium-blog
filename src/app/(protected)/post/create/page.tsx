"use client";
import Tiptap from "@/components/TextEditor";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";

function Editor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishingLoading, setPublishingLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);

  const router = useRouter();
  const handleTitleData = (html: any) => {
    setTitle(html);
  };

  const handleContentData = (html: any) => {
    setContent(html);
  };

  const handlePost = async (published: boolean) => {
    try {
      if (published) {
        setPublishingLoading(true);
      } else {
        setDraftLoading(true);
      }
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
    } finally {
      setPublishingLoading(false);
      setDraftLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-10 my-10">
      <Button onClick={() => router.back()}>
        <ArrowLeftIcon />
      </Button>
      <div className=" h-[100px] w-[95%] md:w-[80%] my-10">
        <Tiptap placeholder="Title Here..." getHtmlData={handleTitleData} />
      </div>
      <div className=" h-[450px] w-[95%] md:w-[80%] my-10">
        <Tiptap placeholder="Content Here..." getHtmlData={handleContentData} />
      </div>
      <div className="flex justify-between items-center w-[75%]">
        <Button
          onClick={() => handlePost(true)}
          className="bg-green-500 hover:bg-green-700 text-sm md:text-lg rounded-full"
        >
          {publishingLoading ? "Publishing..." : "Publish"}
        </Button>
        <Button
          onClick={() => handlePost(false)}
          className="bg-red-500 hover:bg-red-700 text-sm md:text-lg rounded-full"
        >
          {draftLoading ? "Saving as Draft..." : "Save as Draft"}
        </Button>
      </div>
    </div>
  );
}

export default Editor;
