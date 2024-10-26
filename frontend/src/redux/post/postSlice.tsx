import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../interfaces/Post";


interface PostState {
  listPost: IPost[];
}

const initialState: PostState = {
  listPost: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setListPost: (state, action: PayloadAction<IPost[]>) => {
      state.listPost = action.payload;
    },
  },
});

export const { setListPost } = postSlice.actions;

export default postSlice.reducer;
