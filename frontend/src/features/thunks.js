import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await axios.get("/api/users")
  return data
})

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/register", payload)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue()
    }
  }
)

export const recoverToken = createAsyncThunk(
  "user/recoverToken",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/checkToken", {
        withCredentials: true,
      })
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue()
    }
  }
)

export const logUserIn = createAsyncThunk(
  "user/logUserIn",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/login", payload)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue("Email ou senha incorreta.")
    }
  }
)

export const logUserOut = createAsyncThunk(
  "user/logUserOut",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/logout")
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue()
    }
  }
)

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (payload, thunkAPI) => {
    try {
      const { data } = (await axios.post("/api/updateProfile", payload)).data
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue()
    }
  }
)
