import { configureStore } from "@reduxjs/toolkit"
import postsReducer from "../features/posts/postsSlice"
import userReducer from "../features/user/userSlice"
import usersReducer from "../features/users/usersSlice"

export default configureStore({
  reducer: {
    posts: postsReducer,
    currentUser: userReducer,
    users: usersReducer,
  },
})
