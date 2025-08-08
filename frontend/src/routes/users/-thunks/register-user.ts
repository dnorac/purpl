import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RegisterPayload, User } from "../../../types";

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
