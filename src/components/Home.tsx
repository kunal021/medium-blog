"use client";

import Link from "next/link";
import Image from "next/image";
import svg from "../../public/undraw_content_creator_re_pt5b.svg";
import axios from "axios";
import { useState } from "react";
import FormField from "./FormField";
import { Button } from "./ui/button";

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
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    pulish: false,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/post/create", formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center h-[85vh]">
        <div className="flex flex-col justify-center items-start mx-8 sm:mx-14 md:mx-20 space-y-10">
          <FormField
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Title"
            required={true}
            type="text"
            key="title"
          />
          <FormField
            label="Content"
            name="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Content"
            required={true}
            type="textarea"
            key="content"
          />
          <Button onClick={handleSubmit}>Publish</Button>
        </div>
        <div className="hidden lg:flex justify-center items-center mx-20">
          <Image height={500} width={700} alt="logo" src={svg}></Image>
        </div>
      </div>
    </div>
  );
}
