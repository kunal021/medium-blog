import UserPosts from "@/components/settings/UserPosts";
import UserSignOut from "@/components/settings/UserSignOut";

function page() {
  return (
    <div className="flex flex-col-reverse justify-center w-full md:w-fit items-center md:flex-row md:justify-between md:items-start my-5 md:mx-5">
      <div className="w-full md:w-[70%]">
        <UserPosts />
      </div>
      <div className="w-[70%] md:w-[25%] border-2 rounded-md border-black p-5">
        <UserSignOut />
      </div>
    </div>
  );
}

export default page;
