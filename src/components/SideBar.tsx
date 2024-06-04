import { Heart, MessageSquare } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";

const SideBar: React.FC<Sidebar> = ({ postId, numOfComments, likes }) => {
  const [postLike, setpostLikes] = useState(likes);
  const [users, setUsers] = useState("");

  const session = useSession();
  const userId = session.data?.user.id || "";

  const handleLike = async () => {
    try {
      const response = await axios.patch(`/api/post/like?id=${postId}`);
      setpostLikes(response.data.data.likes);
      setUsers(response.data.data.likedBy);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full left-0 sticky bg-black">
      <div className="h-full w-full flex flex-col justify-between items-center py-40">
        <div
          onClick={handleLike}
          className="flex flex-col justify-center items-center text-white cursor-pointer"
        >
          {users.includes(userId) ? (
            <Heart color="#f472b6" fill={"#f472b6"} />
          ) : (
            <Heart color="#ffffff" />
          )}
          {postLike}
        </div>
        <div className="flex flex-col justify-center items-center text-white cursor-pointer">
          <MessageSquare color="#ffffff" />
          {numOfComments}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
