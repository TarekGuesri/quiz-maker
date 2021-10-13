import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "src/redux/store";
import { QuizState, Quiz } from "src/types";

const initialState: QuizState = {
  quiz: null,
  isLoading: true,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuiz: (state, action: PayloadAction<Quiz>) => {
      console.log(action.payload);
    },
  },
});

export const { setQuiz } = quizSlice.actions;

export const getQuizByCode =
  (quizCode: string): AppThunk =>
  async (dispatch, getState) => {
    console.log(quizCode);
  };

export default quizSlice.reducer;
