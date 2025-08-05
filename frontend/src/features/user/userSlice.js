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
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.state = "loading";
        state.user = {};
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.state = "idle";
        state.user = {};
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.user = {};
        state.state = "idle";
      })
      .addCase(logUserIn.pending, (state, action) => {
        state.state = "loading";
        state.error = "";
        state.user = {};
      })
      .addCase(logUserIn.fulfilled, (state, action) => {
        state.state = "idle";
        state.error = "";
        state.user = action.payload;
      })
      .addCase(logUserIn.rejected, (state, action) => {
        state.state = "idle";
        state.user = {};
        state.error = action.payload;
      })
      .addCase(recoverToken.pending, (state, action) => {
        state.state = "loading";
        state.error = "";
        state.user = {};
      })
      .addCase(recoverToken.fulfilled, (state, action) => {
        state.state = "idle";
        state.error = "";
        state.user = action.payload;
      })
      .addCase(recoverToken.rejected, (state, action) => {
        state.state = "idle";
        state.error = "";
        state.user = {};
      })
      .addCase(logUserOut.fulfilled, (state, action) => {
        state.user = {};
        state.error = "";
        state.state = "idle";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      });
  },
});

export const selectCurrentUser = (state) => state.currentUser;

export const useCurrentUser = () => {
  return useSelector(selectCurrentUser).user;
};

export default userSlice.reducer;
