import axios, { AxiosError, AxiosResponse } from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "src/redux/store";
import { QuizState, Quiz } from "src/types";

const initialState: QuizState = {
  quiz: {} as Quiz,
  questionIndex: 0,
  selectedAnswers: [],
  isLoading: true,
  quizStarted: false,
  quizTimer: "00:00",
  isSubmitting: false,
  quizResult: -1, // After getting the result from backend, it becomes 0 or higher
  errorMessage: "",
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetState: () => initialState,
    setQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quiz = { ...action.payload };
      state.isLoading = false;
    },
    getQuizFail: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
    startQuiz: (state) => {
      state.quizStarted = true;
    },
    changeTimer: (state, action: PayloadAction<string>) => {
      state.quizTimer = action.payload;
    },
    nextQuestion: (state) => {
      if (state.questionIndex + 1 < state.quiz.questions.length) {
        state.questionIndex++;
      }
    },
    selectAnswer: (state, action: PayloadAction<string>) => {
      state.selectedAnswers[state.questionIndex] = action.payload;
    },
  },
});

export const {
  changeTimer,
  setQuiz,
  getQuizFail,
  resetState,
  startQuiz,
  nextQuestion,
  selectAnswer,
} = quizSlice.actions;

export const selectQuiz = (state: RootState) => state.quiz;

export const getQuizByCode =
  (quizCode: string): AppThunk =>
  async (dispatch) => {
    try {
      const res: AxiosResponse = await axios.get(`quizzes/${quizCode}`);

      dispatch(setQuiz(res.data));
    } catch (error) {
      const { response } = error as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(getQuizFail(errorMessage));
    }
  };

export const getQuizResult = (): AppThunk => async (dispatch, getState) => {
  const { quiz } = selectQuiz(getState());
  try {
    const res: AxiosResponse = await axios.post(`quizzes/result/${quiz.code}`);

    console.log(res.data);
  } catch (error) {
    const { response } = error as AxiosError;

    const errorMessage = response?.data || "Something unexpected happend!";

    dispatch(getQuizFail(errorMessage));
  }
};

export default quizSlice.reducer;
