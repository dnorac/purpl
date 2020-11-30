import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  logUserIn,
  logUserOut,
  recoverToken,
  registerUser,
  updateProfile,
} from "../thunks";

const initialState = {
  state: "idle",
  error: "",
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.state = "loading";
      state.user = {};
      state.error = "";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.state = "idle";
      state.user = {};
      state.error = "";
    },
    [registerUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.user = {};
      state.state = "idle";
    },
    [logUserIn.pending]: (state, action) => {
      state.state = "loading";
      state.error = "";
      state.user = {};
    },
    [logUserIn.fulfilled]: (state, action) => {
      state.state = "idle";
      state.error = "";
      state.user = action.payload;
    },
    [logUserIn.rejected]: (state, action) => {
      state.state = "idle";
      state.user = {};
      state.error = action.payload;
    },
    [recoverToken.pending]: (state, action) => {
      state.state = "loading";
      state.error = "";
      state.user = {};
    },
    [recoverToken.fulfilled]: (state, action) => {
      state.state = "idle";
      state.error = "";
      state.user = action.payload;
    },
    [recoverToken.rejected]: (state, action) => {
      state.state = "idle";
      state.error = "";
      state.user = {};
    },
    [logUserOut.fulfilled]: (state, action) => {
      state.user = {};
      state.error = "";
      state.state = "idle";
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const selectCurrentUser = (state) => state.currentUser;

export const useCurrentUser = () => {
  return useSelector(selectCurrentUser).user;
};

export default userSlice.reducer;
