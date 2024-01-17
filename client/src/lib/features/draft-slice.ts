import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  //   user: User;
  drawer: boolean;
};

const initialState = {
  drawer: false,
} as InitialState;

export const drawer = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    drawerToggle: (state) => {
      state.drawer = !state.drawer;
    },
  },
});

export const { drawerToggle } = drawer.actions;

export default drawer.reducer;
