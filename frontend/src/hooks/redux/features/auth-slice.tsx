import { User, AppGlobal } from "@/@types/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    email: "",
    userName: "",
    token: "",
  } as User,
  loggedIn: false,
  loading: true,
  draftDrawer: true,
} as AppGlobal;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateDraftDrawer: (state, action: PayloadAction<boolean>) => {
      state.draftDrawer = action.payload;
    },
  },
});

export const { updateUser, updateLoggedIn, updateLoading, updateDraftDrawer } =
  auth.actions;

export default auth.reducer;
