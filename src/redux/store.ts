import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { listReducer } from "./slices/list";

const store = configureStore({
  reducer: {
    list: listReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
