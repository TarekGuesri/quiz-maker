import axios, { AxiosError, AxiosResponse } from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "src/redux/store";
import { QuizState, Quiz } from "src/types";

const initialState: QuizState = {
  quiz: null,
  isLoading: true,
  quizStarted: false,
  errorMessage: "",
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quiz = { ...action.payload };
      state.isLoading = false;
    },
    getQuizFail: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setQuiz, getQuizFail } = quizSlice.actions;

export const getQuizByCode =
  (quizCode: string): AppThunk =>
  async (dispatch) => {
    console.log(quizCode);
    try {
      const res: AxiosResponse = await axios.get(`quizzes/${quizCode}`);

      dispatch(setQuiz(res.data));
    } catch (error) {
      const { response } = error as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(getQuizFail(errorMessage));
    }
  };

export default quizSlice.reducer;
