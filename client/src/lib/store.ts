import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import drawerReducer from "./features/draft-slice";

export const store = configureStore({
  reducer: {
    authReducer,
    drawerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
