import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  user: User;
  loading: boolean;
};

type User = {
  token: string;
  loggedIn: boolean;
};

const initialState = {
  user: {
    token: "",
    loggedIn: false,
  } as User,
  loading: true,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state) => {
      state.user.loggedIn = true;
    },
    logOut: (state) => {
      state.user.loggedIn = false;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.user.token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { logIn, logOut, setToken, setLoading } = auth.actions;

export default auth.reducer;
