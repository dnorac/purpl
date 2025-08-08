import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../../types";

export const fetchUsers = createAsyncThunk<User[], void>(
  "users/fetchUsers",
  async () => {
    const { data } = await axios.get("/api/users");
    return data;
  }
);
