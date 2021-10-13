import axios, { AxiosError, AxiosResponse } from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "src/redux/store";
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
      console.log(action.payload);
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
  async (dispatch, getState) => {
    console.log(quizCode);
    try {
      const res: AxiosResponse = await axios.get(`quizzes/${quizCode}`);
      console.log(res.data);
    } catch (error) {
      const { response } = error as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(getQuizFail(errorMessage));
    }
  };

export default quizSlice.reducer;
