export interface PostState {
  postsList: Post[];
}

export interface Post {
  id?: number | string;
  title: string;
  description: string;
}

export const postInitialState: PostState = {
  postsList: [],
};
