import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { AuthState } from "../../types";
import {
  logUserIn,
  logUserOut,
  recoverToken,
  registerUser,
  updateProfile,
} from "../thunks";

const initialState: AuthState = {
  state: "idle",
  error: null,
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.state = "loading";
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.user = null;
        state.state = "failed";
      })
      .addCase(logUserIn.pending, (state) => {
        state.state = "loading";
        state.error = null;
        state.user = null;
      })
      .addCase(logUserIn.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.error = null;
        state.user = action.payload;
      })
      .addCase(logUserIn.rejected, (state, action) => {
        state.state = "failed";
        state.user = null;
        state.error = action.payload as string;
      })
      .addCase(recoverToken.pending, (state) => {
        state.state = "loading";
        state.error = null;
        state.user = null;
      })
      .addCase(recoverToken.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.error = null;
        state.user = action.payload;
      })
      .addCase(recoverToken.rejected, (state) => {
        state.state = "failed";
        state.error = null;
        state.user = null;
      })
      .addCase(logUserOut.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.state = "succeeded";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      });
  },
});

export const selectCurrentUser = (state: RootState) => state.currentUser;

export const useCurrentUser = () => {
  return useSelector(selectCurrentUser).user;
};

export default userSlice.reducer;
