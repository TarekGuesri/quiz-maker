import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
  darkMode: boolean;
}

const initialState: UIState = {
  darkMode: true,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
});

export default uiSlice.reducer;
