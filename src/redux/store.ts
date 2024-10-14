import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import globalSlice from "./features/global/globalSlice";
import linksSlice from "./features/links/linksSlice";
import userSlice from "./features/user/userSlice";

// make store
export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      [authSlice.name]: authSlice.reducer,
      [globalSlice.name]: globalSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [linksSlice.name]: linksSlice.reducer,
    },
    middleware: (gDMs) => gDMs().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

// type
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// the store
const store = makeStore();
export default store;
