import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../-store";
import { User } from "../../types";
import { recoverToken } from "../users/-thunks/recover-token";
import { registerUser } from "../users/-thunks/register-user";
import { logUserIn, logUserOut, updateProfile } from "./-thunks";

interface CurrentUserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CurrentUserState = {
  user: null,
  status: "idle",
  error: null,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // logUserIn
      .addCase(logUserIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logUserIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logUserIn.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload as string;
      })
      // logUserOut
      .addCase(logUserOut.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logUserOut.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.error = null;
      })
      .addCase(logUserOut.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.user = action.payload;
          state.error = null;
        }
      )
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload as string;
      })
      // recoverToken
      .addCase(recoverToken.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(recoverToken.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(recoverToken.rejected, (state) => {
        state.status = "failed";
        state.user = null;
        state.error = null; // Don't show error for failed token recovery
      });
  },
});

export const selectCurrentUser = (state: RootState) => state.currentUser;

export default currentUserSlice.reducer;
