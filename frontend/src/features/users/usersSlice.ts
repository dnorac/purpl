import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User, UsersState } from "../../types";
import { fetchUsers, registerUser } from "../thunks";

const initialState: UsersState = {
  state: "loading",
  users: [],
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.users = action.payload.map((user) => ({
          ...user,
        }));
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.state = "failed";
        state.users = [];
        state.error = "Failed to fetch users";
      })
      .addCase(registerUser.pending, (state) => {
        state.state = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.state = "succeeded";
      })
      .addCase(registerUser.rejected, (state) => {
        state.state = "failed";
      });
  },
});

export const { register } = usersSlice.actions;

export const selectAllUsers = (state: RootState) => state.users;
export const selectUserById = (id: string) => (state: RootState) =>
  state.users.users.find((user) => user._id === id);

export default usersSlice.reducer;
