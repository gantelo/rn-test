export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const getFeed = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json() as Promise<Post[]>;
};

export const getFeedById = async (id: number): Promise<Post> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return response.json() as Promise<Post>;
};

export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  return response.json() as Promise<Comment[]>;
};