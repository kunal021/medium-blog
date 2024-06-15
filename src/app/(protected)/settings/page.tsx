import UserPosts from "@/components/settings/UserPosts";
import UserSignOut from "@/components/settings/UserSignOut";

function page() {
  return (
    <div className="flex justify-between items-start">
      <div className="w-[60%]">
        <UserPosts />
      </div>
      <div className="w-[30%] border-2 rounded-md border-black p-5 m-2">
        <UserSignOut />
      </div>
    </div>
  );
}

export default page;
