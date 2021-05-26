import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState } from "./post.state";

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state)=>{
    return state.postsList;
})

export const getPostById = createSelector(getPostsState, (state,props) => {
    return state.postsList.find(post => post.id === props.id)
})