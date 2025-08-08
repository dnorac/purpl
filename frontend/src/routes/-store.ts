import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./posts/-post-slice";
import usersReducer from "./users/-user-slice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
