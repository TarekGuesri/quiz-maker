import axios, { AxiosError, AxiosResponse } from "axios";
import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { AppThunk, RootState } from "src/redux/store";
import { CreateQuizState, ChangeAnswer } from "src/types";

const firstAnswerID = uuidv4();

const initialState: CreateQuizState = {
  title: "",
  description: "",
  questionIndex: 0,
  questions: [
    {
      id: uuidv4(),
      content: "",
      answers: [
        { id: firstAnswerID, text: "" },
        { id: uuidv4(), text: "" },
        { id: uuidv4(), text: "" },
        { id: uuidv4(), text: "" },
      ],
    },
  ],
  selectedAnswers: [firstAnswerID],
  isLoading: false,
  isValid: false,
  quizID: "",
  errorMessage: "",
};

export const createQuizSlice = createSlice({
  name: "create-quiz",
  initialState,
  reducers: {
    resetState: () => initialState,
    addQuestion: (state) => {
      const firstAnswerID = uuidv4();

      // Adding the question
      state.questions.push({
        id: uuidv4(),
        content: "",
        answers: [
          { id: firstAnswerID, text: "" },
          { id: uuidv4(), text: "" },
          { id: uuidv4(), text: "" },
          { id: uuidv4(), text: "" },
        ],
      });

      // Adding new selected answer
      state.selectedAnswers.push(firstAnswerID);

      // Changing index
      state.questionIndex = current(state.questions).length - 1;
    },
    removeQuestion: (state) => {
      // We remove the selected answer from the target question
      const currentIndex = state.questionIndex;
      state.selectedAnswers.splice(currentIndex, 1);

      // We remove the question
      state.questions.splice(currentIndex, 1);

      // We change the index
      const newQuestionsLength = current(state.questions).length;

      state.questionIndex =
        currentIndex === newQuestionsLength ? currentIndex - 1 : currentIndex;
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    changeDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    changeQuestion: (state, action: PayloadAction<string>) => {
      state.questions[state.questionIndex].content = action.payload;
    },
    changeAnswer: (state, action: PayloadAction<ChangeAnswer>) => {
      const { value, name } = action.payload;

      // We get the answer's index
      const answerIndex = state.questions[
        state.questionIndex
      ].answers.findIndex((answer) => answer.id === name);

      // We change the answer's text
      state.questions[state.questionIndex].answers[answerIndex].text = value;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.questionIndex = action.payload;
    },
    setSelectedAnswer: (state, action: PayloadAction<string>) => {
      state.selectedAnswers[state.questionIndex] = action.payload;
    },
    validateForm: (state) => {
      // We clear errors
      state.errorMessage = "";

      // Then we validate the form
      const { title, questions } = current(state);

      // Validating the title
      if (!title) {
        state.errorMessage = "Quiz title can't be empty";
        state.isValid = false;
        return;
      }

      // Validating questions
      const nonValidQuestions: number[] = [];

      questions.forEach((question, index) => {
        const { content, answers } = question;
        // We validate the question's content
        if (!content) {
          nonValidQuestions.push(index + 1);
          return;
        }

        // Validating question's answers
        for (let i = 0; i < answers.length; i++) {
          const answer = answers[i];

          if (!answer.text) {
            nonValidQuestions.push(index + 1);
            return;
          }
        }
      });

      if (nonValidQuestions.length > 0) {
        state.errorMessage = `Please fill in all the fields of the questions "${nonValidQuestions.join(
          ", ",
        )}"`;
        state.isValid = false;
        return;
      } else {
        state.isValid = true;
      }
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    createQuizSuccess: (state, action: PayloadAction<string>) => {
      state.errorMessage = "";
      state.quizID = action.payload;
      state.isLoading = false;
    },
    createQuizFail: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  resetState,
  addQuestion,
  changeAnswer,
  changeDescription,
  changeTitle,
  changePage,
  changeQuestion,
  validateForm,
  removeQuestion,
  setSelectedAnswer,
  setLoading,
  createQuizSuccess,
  createQuizFail,
} = createQuizSlice.actions;

export const selectCreateQuiz = (state: RootState) => state.createQuiz;

export const createQuiz = (): AppThunk => async (dispatch, getState) => {
  dispatch(validateForm());

  const { title, description, questions, selectedAnswers, isValid } =
    selectCreateQuiz(getState());

  // If the form is valid, we send a request to the api
  if (isValid) {
    dispatch(setLoading());

    try {
      const res: AxiosResponse = await axios.post("quizzes", {
        title,
        description,
        questions,
        selectedAnswers,
      });

      dispatch(createQuizSuccess(res.data));
    } catch (error) {
      // Catching the error
      const { response } = error as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(createQuizFail(errorMessage));
    }
  }
};

export default createQuizSlice.reducer;
