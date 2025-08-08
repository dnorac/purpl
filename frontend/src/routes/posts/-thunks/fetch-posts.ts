import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Post } from "../../../types";

export const fetchPosts = createAsyncThunk<Post[], void>(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/posts");
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.error || "Failed to fetch posts"
      );
    }
  }
);
