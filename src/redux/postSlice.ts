import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostStateType {
    post: PostType | null;
}
interface PostType {
    createdAt: string;
    nick: string;
    title: string;
    body: string;
    postId?: number;
}
const initialState: PostStateType = {
    post: null
};
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        readPost: (state: PostStateType, action: PayloadAction<PostType>) => {
            state.post = action.payload;
        },
        initialPost: () => initialState
    }
});
export const { readPost, initialPost } = postSlice.actions;
export default postSlice;
