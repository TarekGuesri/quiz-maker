import { createSlice } from "@reduxjs/toolkit";
import { UIState } from "src/types";

const initialState: UIState = {
  darkMode: localStorage.getItem("darkMode") === "on",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    switchDarkMode: (state) => {
      state.darkMode = !state.darkMode;

      localStorage.setItem("darkMode", state.darkMode ? "on" : "off");
    },
  },
});

export const { switchDarkMode } = uiSlice.actions;

export default uiSlice.reducer;
