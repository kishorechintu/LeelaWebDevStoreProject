import { createReducer, on } from "@ngrx/store";
import { addPost, deletePost, updatePost } from "./post.actions";
import { postInitialState } from "./post.state";

const _postsReducer = createReducer(postInitialState, on(addPost,(state,action) =>{
    let post = {...action.post};
    post.id = state.postsList.length + 1;
    return{
        ...state,
        postsList: [
            ...state.postsList, post
        ]
    }
}),
on(updatePost, (state, action) => {
    const updatedPost = state.postsList.map(post => {
        return post.id === action.post.id ? action.post : post;
    })
    return {
        ...state,
        postsList: updatedPost
    }
}),
on(deletePost, (state, action) => {
    const updatedPost = state.postsList.filter(data => {
        return data.id !== action.id;
    })
    return {
        ...state,
        postsList : updatedPost
    }
}));


export function postsReducer (state, action) {
    return _postsReducer(state, action);
}