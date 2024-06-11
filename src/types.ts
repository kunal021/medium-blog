interface Post {
  id: number;
  title: string;
  content: string;
  likes: number;
  likedBy: string[];
  publishedAt: string;
  authorId: string;
  user?: User;
  comments?: Comment;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Comment {
  id?: number;
  postId?: number;
  likes?: number;
  title?: string;
  likedBy?: string[];
}

interface userComments {
  comment: {};
  postId: number;
}

interface Sidebar {
  postId: number;
  numOfComments: number;
  likes: number;
}

interface FormFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  required: boolean;
}

interface ImageAndDate {
  image?: string;
  name?: string;
  publishedAt: string;
  content: number;
}
