import { createSlice } from '@reduxjs/toolkit';
import { IUserDetail } from '../../interfaces/User';

// Define the initial state using the UserDetail type
const initialState: IUserDetail|any= {
    id: "",
    name: "",
    phone: "",
    email: "",
    zalo: "",
    facebook: "",
    avatar: "",
    account_balance:"",
    type: "",
};

// Define the slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDetailUser: (state, action) => {
            const { id, name, phone, email, zalo, facebook,account_balance, avatar, type } = action.payload;
            state.id = id;
            state.name = name;
            state.phone = phone;
            state.email = email;
            state.zalo = zalo;
            state.facebook = facebook;
            state.account_balance = account_balance;
            state.avatar = avatar;
            state.type = type;
        },
    },
});

// Export the actions and the reducer
export const { setDetailUser } = userSlice.actions;
export default userSlice.reducer;
