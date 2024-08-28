import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../interfaces/Post";


interface PostState {
  listPost: Post[];
}

const initialState: PostState = {
  listPost: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setListPost: (state, action: PayloadAction<Post[]>) => {
      state.listPost = action.payload;
    },
  },
});

export const { setListPost } = postSlice.actions;

export default postSlice.reducer;
