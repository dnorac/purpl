import { createSlice } from "@reduxjs/toolkit"
import {
  logUserIn,
  logUserOut,
  recoverToken,
  registerUser,
  updateProfile,
} from "../thunks"

const initialState = {
  state: "idle",
  error: "",
  user: {},
}

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.state = "loading"
      state.user = {}
      state.error = ""
    },
    [registerUser.fulfilled]: (state, action) => {
      state.state = "idle"
      state.user = action.payload
      state.error = ""
    },
    [registerUser.rejected]: (state, action) => {
      state.error = action.payload
      state.user = {}
      state.state = "idle"
    },
    [logUserIn.pending]: (state, action) => {
      state.state = "loading"
      state.error = ""
      state.user = {}
    },
    [logUserIn.fulfilled]: (state, action) => {
      state.state = "idle"
      state.error = ""
      state.user = action.payload
    },
    [logUserIn.rejected]: (state, action) => {
      state.state = "idle"
      state.user = {}
      state.error = action.payload
    },
    [recoverToken.pending]: (state, action) => {
      state.state = "loading"
      state.error = ""
      state.user = {}
    },
    [recoverToken.fulfilled]: (state, action) => {
      state.state = "idle"
      state.error = ""
      state.user = action.payload
    },
    [recoverToken.rejected]: (state, action) => {
      state.state = "idle"
      state.error = ""
      state.user = {}
    },
    [logUserOut.fulfilled]: (state, action) => {
      state.user = {}
      state.error = ""
      state.state = "idle"
    },
    [updateProfile.fulfilled]: (state, action) => {
      console.log(updateProfile.fulfilled)
      state.user = action.payload
    },
  },
})

export const selectCurrentUser = state => state.currentUser

export default userSlice.reducer
