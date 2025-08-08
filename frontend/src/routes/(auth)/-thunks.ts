import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginPayload, User } from "../../types";

export const logUserIn = createAsyncThunk<User, LoginPayload>(
  "user/logUserIn",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/login", payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Email ou senha incorreta.");
    }
  }
);

export const logUserOut = createAsyncThunk<void, void>(
  "user/logUserOut",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/logout");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

export const updateProfile = createAsyncThunk<User, Partial<User>>(
  "user/updateProfile",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/updateProfile", payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Profile update failed");
    }
  }
);
