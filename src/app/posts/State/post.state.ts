export interface PostState {
  postsList: Post[];
}

export interface Post {
  id?: number;
  title: string;
  description: string;
}

export const postInitialState: PostState = {
  postsList: [
    {
      id: 1,
      title: 'first title',
      description: 'first Description',
    },
    {
      id: 2,
      title: 'second title',
      description: 'second Description',
    },
  ],
};
