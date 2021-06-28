import { createReducer, on } from '@ngrx/store';
import {
    addPostSuccess,
  deletePost,
  loadPostsSuccess,
  updatePostSuccess,
} from './post.actions';
import { postInitialState } from './post.state';

const _postsReducer = createReducer(
  postInitialState,
  on(addPostSuccess, (state, action) => {
    let post = { ...action.post };
    return {
      ...state,
      postsList: [...state.postsList, post],
    };
  }),
  on(updatePostSuccess, (state, action) => {
    const updatedPost = state.postsList.map((post) => {
      return post.id === action.post.id ? action.post : post;
    });
    return {
      ...state,
      postsList: updatedPost,
    };
  }),
  on(deletePost, (state, action) => {
    const updatedPost = state.postsList.filter((data) => {
      return data.id !== action.id;
    });
    return {
      ...state,
      postsList: updatedPost,
    };
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      postsList: action.posts,
    };
  })
);

export function postsReducer(state, action) {
  return _postsReducer(state, action);
}
