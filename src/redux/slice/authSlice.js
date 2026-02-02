import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
  "/auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/login", credentials);
      toast.success("Login successful");
      return res?.data?.data;
    } catch (error) {
      // console.log(error?.response?.data?.message)
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  },
);
export const logoutThunk = createAsyncThunk(
  "/auth/logout",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/logout");
      toast.success("Logged Out successful");
      return true;
    } catch (error) {
      // console.log(error?.response?.data?.message)
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const fetchOwner = createAsyncThunk(
  "/auth/fetch-owner",
  async (__dirname, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/fetch-owner");
      if(response?.data?.success)
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // logout: (state) => {
    //   state.user = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
