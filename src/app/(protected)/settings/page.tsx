import UserPosts from "@/components/settings/UserPosts";
import UserSignOut from "@/components/settings/UserSignOut";

function page() {
  return (
    <div className="flex flex-col-reverse justify-center w-full items-center md:flex-row md:justify-between md:items-start my-5">
      <div className="w-full md:w-[70%]">
        <UserPosts />
      </div>
    </div>
  );
}

export default page;
