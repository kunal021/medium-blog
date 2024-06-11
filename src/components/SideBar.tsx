import { Heart, MessageSquare } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";

const SideBar: React.FC<Sidebar> = ({ postId, numOfComments, likes }) => {
  const [postLike, setpostLikes] = useState(likes);
  const [users, setUsers] = useState<string[]>([]);

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

  console.log(users);

  return (
    <div className="h-full w-full">
      <div className="h-full w-full flex justify-start items-center space-x-20">
        <div
          onClick={handleLike}
          className="flex flex-col justify-center items-center cursor-pointer"
        >
          {users.includes(userId) ? (
            <Heart color="#f472b6" fill={"#f472b6"} className="h-6 w-6" />
          ) : (
            <Heart className="h-6 w-6" />
          )}
          {postLike}
        </div>
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <MessageSquare className="h-6 w-6" />
          {numOfComments}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
