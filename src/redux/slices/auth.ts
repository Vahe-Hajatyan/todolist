import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
const initialState = {
  data: null,
  loading: false,
};

export const register = createAsyncThunk("register", async (params: object) => {
  const { data } = await axios.post("/auth/register", params);
  return data;
});
export const login = createAsyncThunk("login", async (params: object) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});
export const getMe = createAsyncThunk("getMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.data = null;
        state.loading = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = true;
      })
      .addCase(login.pending, (state) => {
        state.data = null;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = true;
      })
      .addCase(getMe.pending, (state) => {
        state.data = null;
        state.loading = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = true;
      })
      .addCase(getMe.rejected, (state) => {
        state.data = null;
        state.loading = false;
      });
  },
});

export const selectIsAuth = (state: any) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
