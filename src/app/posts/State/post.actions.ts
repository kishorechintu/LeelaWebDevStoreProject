import { createAction, props } from "@ngrx/store";
import { Post } from "./post.state";

export const ADD_POST = "[post page] add Post";
export const UPDATE_POST = "[post page] update Post";
export const DELETE_POST = "[post page] delete Post"

export const addPost = createAction(ADD_POST, props<{post: Post}>())

export const updatePost = createAction(UPDATE_POST, props<{post: Post}>())

export const deletePost = createAction(DELETE_POST, props<{id : number}>())