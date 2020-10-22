import { createSlice } from "@reduxjs/toolkit"
import { fetchUsers, registerUser } from "../thunks"

const initialState = {
  state: "loading",
  users: [
    // {
    //   id: "1",
    //   firstName: "Daniel",
    //   lastName: "Castro",
    //   email: "daniel_nora@hotmail.com",
    //   password: "nora03",
    //   avatar: "https://br.web.img3.acsta.net/newsv7/19/10/04/01/13/5346274.jpg",
    // },
  ],
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload)
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {},
    [fetchUsers.fulfilled]: (state, action) => {
      return {
        state: "idle",
        users: action.payload.map(user => ({
          ...user,
        })),
      }
    },
    [fetchUsers.rejected]: (state, action) => {
      return { state: "error", users: [] }
    },
    [registerUser.pending]: (state, action) => {},
    [registerUser.fulfilled]: (state, action) => {
      state.users.push(action.payload)
    },
    [registerUser.rejected]: (state, action) => {},
  },
})

export const { register } = usersSlice.actions

export const selectAllUsers = state => state.users
export const selectUserById = id => state =>
  state.users.users.find(user => user._id === id)

export default usersSlice.reducer
