import { createSlice } from '@reduxjs/toolkit';
// Define a type for the slice state

interface AuthInitialState {
    isLogged: boolean; 
}

const initialState: AuthInitialState = {
    isLogged :false, 
};

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setIsLoginSuccess: (state, action) => {
            state.isLogged = action.payload;
        },
    },
});

export const {   setIsLoginSuccess } = authSlice.actions;

export default authSlice.reducer;
