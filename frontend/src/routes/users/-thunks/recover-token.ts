import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../../types";

export const recoverToken = createAsyncThunk<User, void>(
  "user/recoverToken",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/checkToken", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Token recovery failed");
    }
  }
);
