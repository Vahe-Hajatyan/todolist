import { configureStore } from "@reduxjs/toolkit";
import { listReducer } from "./slices/list";

const store = configureStore({
  reducer: {
    list: listReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
