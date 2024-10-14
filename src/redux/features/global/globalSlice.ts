import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initial state
const initialState = {
  activeMenuTab: "links" as MenuTabNames,
};

// create slice
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setActiveMenuTab: (state, action: PayloadAction<MenuTabNames>) => {
      state.activeMenuTab = action.payload;
    },
  },
});

export const globalActions = globalSlice.actions;
export default globalSlice;
