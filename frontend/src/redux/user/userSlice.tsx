import { createSlice } from '@reduxjs/toolkit';
import { IUserDetail } from '../../interfaces/User';

// Lấy dữ liệu từ localStorage
const storedUser = localStorage.getItem('userDetail');
const initialState: IUserDetail | any = storedUser ? JSON.parse(storedUser)   
  : {
      id: "",
      name: "",
      phone: "",
      email: "",
      zalo: "",
      facebook: "",
      avatar: "",
      account_balance: "",
      type: "",
    };

// Define the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDetailUser: (state, action) => {
      const { id, name, phone, email, zalo, facebook, account_balance, avatar, type } = action.payload;
      state.id = id;
      state.name = name;
      state.phone = phone;
      state.email = email;
      state.zalo = zalo;
      state.facebook = facebook;
      state.account_balance = account_balance;
      state.avatar = avatar;
      state.type = type;
      // Lưu dữ liệu vào localStorage
      localStorage.setItem('userDetail', JSON.stringify(state));
    },

    setAccountBalance: (state, action) => {
      state.account_balance += action.payload;
    }
  },
});

// Export the actions and the reducer
export const { setDetailUser ,setAccountBalance} = userSlice.actions;
export default userSlice.reducer;
