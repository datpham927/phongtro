import { createSlice } from '@reduxjs/toolkit';
// Define a type for the slice state

interface AuthInitialState {
    isLogged: boolean; 
}

const initialState: AuthInitialState = {
    isLogged: localStorage.getItem('authState') === 'true',
};

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setIsLoginSuccess: (state, action) => {
            state.isLogged = action.payload;
            localStorage.setItem('authState', action.payload.toString()); // Convert boolean to string
        },
    }
    
});

export const {   setIsLoginSuccess } = authSlice.actions;

export default authSlice.reducer;
