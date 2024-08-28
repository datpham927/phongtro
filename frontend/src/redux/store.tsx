import { configureStore } from '@reduxjs/toolkit'
import actionReduce from './action/actionSlice'
import authReduce from './auth/authSlice'
import userReduce from './user/userSlice'
import categoryReduce from './category/categorySlice'

export const store = configureStore({
  reducer: {
    action: actionReduce ,
    auth: authReduce ,
    user: userReduce ,
    category: categoryReduce ,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch