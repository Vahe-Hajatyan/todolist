import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const K_f_L = "keyFoList";

interface listState {
  text: [{}];
}

const initialState: listState = {
  text: JSON.parse(localStorage.getItem(K_f_L) ?? "[{}]"),
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList(state: any, action: PayloadAction<any>) {
      state.text.push(action.payload);
      localStorage.setItem(K_f_L, JSON.stringify(state.text));
    },
    changingDone(state: any, action: PayloadAction<any>) {
      state.text = state.text.map((f: any) =>
        f.id === action.payload.id ? action.payload : f
      );
      localStorage.setItem(K_f_L, JSON.stringify(state.text));
    },
    removeListItem(state: any, action: PayloadAction<any>) {
      state.text = state.text.filter((f: any) => f.id !== action.payload);
      localStorage.setItem(K_f_L, JSON.stringify(state.text));
    },
  },
});

export const listReducer = listSlice.reducer;
export const { addList, changingDone, removeListItem } = listSlice.actions;
