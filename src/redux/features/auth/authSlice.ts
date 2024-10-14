import { UserPublic } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";

// initial state
const initialState = {
  user: null as UserPublic | null,
};

// create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPublic>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
      signOut();
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
