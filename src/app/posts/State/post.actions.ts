import { createAction, props } from '@ngrx/store';
import { Post } from './post.state';

export const ADD_POST = '[post page] add Post';
export const ADD_POST_SUCCESS = '[post page] add Post success';
export const UPDATE_POST = '[post page] update Post';
export const UPDATE_POST_SUCCESS = '[post page] update Post';
export const DELETE_POST = '[post page] delete Post';
export const DELETE_POST_SUCCESS = '[post page] delete Post Success';

export const LOAD_POSTS = '[post page] load posts';
export const LOAD_POSTS_SUCCESS = '[post page] load posts success';

export const addPost = createAction(ADD_POST, props<{ post: Post }>());
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post: Post }>());

export const updatePost = createAction(UPDATE_POST, props<{ post: Post }>());
export const updatePostSuccess = createAction(UPDATE_POST_SUCCESS, props<{ post: Post }>());

export const deletePost = createAction(DELETE_POST, props<{ id: string }>());
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{id: string}>())

export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(
  LOAD_POSTS_SUCCESS,
  props<{ posts: Post[] }>()
);
