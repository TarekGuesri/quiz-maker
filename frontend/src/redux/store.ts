import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import ui from "./ui/uiSlice";

export const store = configureStore({
  reducer: {
    ui,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
