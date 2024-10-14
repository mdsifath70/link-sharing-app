import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// initial state
const initialState = {
  links: [] as LinkItemType[],
  errors: null as { [name: string]: { message: string } } | null,
};

// create slice
const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    addNewLink: (
      state,
      action: PayloadAction<{ platformName: PlatformNames; url: string }>,
    ) => {
      const { platformName, url } = action.payload;
      const id = uuidv4();
      state.links.push({ id, platformName, url });
    },

    handleChangeLink: (
      state,
      action: PayloadAction<{
        index: number;
        name: keyof LinkItemType;
        value: string;
      }>,
    ) => {
      const { index, name, value } = action.payload;
      const item = state.links[index];

      if (item) {
        if (name === "platformName") {
          item[name] = value as PlatformNames;
        } else {
          item[name] = value;
        }
      }
    },

    setLinks: (state, action: PayloadAction<LinkItemType[]>) => {
      state.links = action.payload;
    },

    removeLink: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.links = state.links.filter((link) => link.id !== id);
    },

    setError: (
      state,
      action: PayloadAction<{ name: string; message: string }>,
    ) => {
      const { name, message } = action.payload;
      state.errors = {
        ...state.errors,
        [name]: { message },
      };
    },

    removeError: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      if (state.errors) {
        delete state.errors[name];
      }
    },

    resetErrors: (state) => {
      state.errors = null;
    },
  },
});

export const linksActions = linksSlice.actions;
export default linksSlice;
