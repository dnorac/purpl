import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, registerUser } from "../thunks";

const initialState = {
  state: "loading",
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {})
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return {
          state: "idle",
          users: action.payload.map((user) => ({
            ...user,
          })),
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        return { state: "error", users: [] };
      })
      .addCase(registerUser.pending, (state, action) => {})
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {});
  },
});

export const { register } = usersSlice.actions;

export const selectAllUsers = (state) => state.users;
export const selectUserById = (id) => (state) =>
  state.users.users.find((user) => user._id === id);

export default usersSlice.reducer;
