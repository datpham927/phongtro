import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../interfaces/Post";


interface PostState {
  listPost: IPost[];
  allPostAroundYourArea: IPost[];
}

const initialState: PostState = {
  listPost: [],
  allPostAroundYourArea: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setListPost: (state, action: PayloadAction<IPost[]>) => {
      state.listPost = action.payload;
    },
    setAllPostAroundYourArea: (state, action: PayloadAction<IPost[]>) => {
      state.listPost = action.payload;
    },
  },
});

export const { setListPost,setAllPostAroundYourArea } = postSlice.actions;

export default postSlice.reducer;
