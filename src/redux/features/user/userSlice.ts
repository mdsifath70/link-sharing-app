import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initial state
export const initialState = {
  profile: {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    image: "",
    imageFileName: "",
  },
};

// create slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleChangeProfile: (
      state,
      action: PayloadAction<
        Partial<{
          [key in keyof typeof initialState.profile]: string;
        }>
      >,
    ) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
