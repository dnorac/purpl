import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { LoginPayload, RegisterPayload, User } from "../types";

export const fetchUsers = createAsyncThunk<User[], void>(
  "users/fetchUsers",
  async () => {
    const { data } = await axios.get("/api/users");
    return data;
  }
);

export const registerUser = createAsyncThunk<User, RegisterPayload>(
  "user/registerUser",
  async (payload, thunkAPI) => {
    try {
      // Map frontend fields to backend expectations
      const backendPayload = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        passwordRepeat: payload.passwordRepeat, // Required by backend
        privacyPolicy: payload.privacyPolicy,
        termsOfService: payload.termsOfService,
      };

      console.log("Sending registration data to backend:", backendPayload);

      const { data } = await axios.post("/api/register", backendPayload);
      if (data.status === "error") throw data.error;
      return data.user || data; // Backend returns { status: "success", user: newUser }
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      console.error("Registration error:", error);
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.error || "Registration failed"
      );
    }
  }
);

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
