import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import userReducer from "../features/user/userSlice";
import usersReducer from "../features/users/usersSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    currentUser: userReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
