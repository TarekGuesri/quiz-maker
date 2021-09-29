import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface ChangeAnswer {
  name: string;
  value: string;
}
interface QuestionAnswer {
  id: string;
  text: string;
}
interface Question {
  id: string;
  content: string;
  answers: [QuestionAnswer, QuestionAnswer, QuestionAnswer, QuestionAnswer];
}
interface CreateQuizState {
  title: string;
  questionIndex: number;
  questions: Question[];
  selectedAnswers: string[];
}

const firstAnswerID = uuidv4();

const initialState: CreateQuizState = {
  title: "",
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
};

export const createQuizSlice = createSlice({
  name: "create-quiz",
  initialState,
  reducers: {
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
      state.questionIndex++;
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
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
  },
});

export const {
  addQuestion,
  changeAnswer,
  changeTitle,
  changePage,
  changeQuestion,
  setSelectedAnswer,
} = createQuizSlice.actions;

export default createQuizSlice.reducer;
