import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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
    addSelectedAnswer: (state, action: PayloadAction<string>) => {
      state.selectedAnswers.push(action.payload);
    },
  },
});

export const { addQuestion, addSelectedAnswer } = createQuizSlice.actions;

export default createQuizSlice.reducer;
