import UserPosts from "@/components/settings/UserPosts";
import UserSignOut from "@/components/settings/UserSignOut";

function page() {
  return (
    <div className="flex flex-col-reverse justify-center items-center md:flex-row md:justify-between md:items-start md:m-5">
      <div className="md:w-[70%]">
        <UserPosts />
      </div>
      <div className="md:w-[25%] border-2 rounded-md border-black p-5 m-2">
        <UserSignOut />
      </div>
    </div>
  );
}

export default page;
