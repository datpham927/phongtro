import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

// Define the initial state using that type
interface actionInitial {
    openFeatureAuth: boolean;
    featureAuth: number; //0 register 1 login 2 forgot
    loading: boolean; //0 register 1 login 2 forgot

}
const initialState: actionInitial = {
    openFeatureAuth: false, 
    featureAuth: 0, 
    loading:false
};

export const actionSlice = createSlice({
    name: 'action',
    initialState,
    reducers: {
        setOpenFeatureAuth: (state, action: PayloadAction<boolean>) => {
            state.openFeatureAuth = action.payload;
        },
      
        setFeatureAuth: (state, action: PayloadAction<number>) => {
            state.featureAuth = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
     
    },
});
export const {
    setOpenFeatureAuth,
    setFeatureAuth, 
    setLoading,
} = actionSlice.actions;

export default actionSlice.reducer;
