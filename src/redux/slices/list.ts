import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  text: [{}],
  loading: false,
};

export const getList = createAsyncThunk("addList", async () => {
  const { data } = await axios.get("/list");
  return data;
});
export const setList = createAsyncThunk("setList", async (params: object) => {
  const { data } = await axios.post("/list", params);
  return data;
});
export const deleteList = createAsyncThunk("deleteList", (id: any) =>
  axios.delete(`/list/${id}`)
);
export const updateList = createAsyncThunk("updateList", (obj: any) =>
  axios.patch(`/list/${obj._id}`, obj)
);

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.text = [];
        state.loading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.text.push(...action.payload);
        state.loading = false;
      })
      .addCase(getList.rejected, (state) => {
        state.text = [];
        state.loading = true;
      })
      .addCase(setList.pending, (state) => {
        state.loading = true;
      })
      .addCase(setList.fulfilled, (state, action) => {
        state.text.push(action.payload);
      })
      .addCase(deleteList.pending, (state, action) => {
        state.text = state.text.filter(
          (obj: any) => obj._id !== action.meta.arg
        );
      })
      .addCase(updateList.pending, (state, action) => {
        state.text = state.text.map((obj: any) =>
          obj._id === action.meta.arg._id ? action.meta.arg : obj
        );
      });
  },
});

export const listReducer = listSlice.reducer;
