import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 
// Define a type for the slice state

// Define the initial state using that type
interface actionInitial {
    openFeatureAuth: boolean;
    featureAuth: number; //0 register 1 login 2 forgot
    loading: boolean; //0 register 1 login 2 forgot 
    isOpenChat: boolean;
    conversations:any ,
    isLoadChat:boolean
}
const initialState: actionInitial = {
    openFeatureAuth: false, 
    featureAuth: 0, 
    loading:false,
    isOpenChat:false,
    isLoadChat:false,
    conversations:[], 
};

export const actionSlice = createSlice({
    name: 'action',
    initialState,
    reducers: {
        setOpenFeatureAuth: (state, action: PayloadAction<boolean>) => {
            state.openFeatureAuth = action.payload;
        },
        setIsOpenChat: (state, action: PayloadAction<boolean>) => {
            state.isOpenChat = action.payload;
        },
        setFeatureAuth: (state, action: PayloadAction<number>) => {
            state.featureAuth = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setConversations: (state, action: PayloadAction<any>) => {
            state.conversations = action.payload;
        },
        setIsLoadChat: (state) => {
            state.isLoadChat = !state.isLoadChat;
        },
    },
});
export const {
    setOpenFeatureAuth,
    setFeatureAuth, 
    setLoading,
    setIsOpenChat,
    setConversations, 
    setIsLoadChat,
} = actionSlice.actions;

export default actionSlice.reducer;
