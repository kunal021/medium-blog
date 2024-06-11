import axios from "axios";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const Comments: React.FC<userComments> = ({ comment, postId }) => {
  const [title, setTitle] = useState("");
  const [allComments, setAllComments] = useState<any[]>([]);
  useEffect(() => {
    if (Array.isArray(comment)) {
      // Ensure comment is an array
      setAllComments(comment); // Update comments when the prop changes
    }
  }, [comment]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `/api/post/comment/create?id=${postId}`,
        {
          title: title,
        }
      );
      setAllComments([...allComments, response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(allComments);

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-2 p-1 border-black"
      />
      <Button onClick={handleAddComment}>send</Button>
    </div>
  );
};

export default Comments;
