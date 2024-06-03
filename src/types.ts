interface Post {
  id: number;
  title: string;
  content: string;
  likes: number;
  publishedAt: string;
  authorId: string;
  user?: User;
}

interface User {
  id: string;
  name: string;
  email: string;
}
