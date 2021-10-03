import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
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
  questions: Array<Question>;
  selectedAnswers: Array<string>;
  errorMessage: string;
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
  errorMessage: "",
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
        return;
      }
    },
  },
});

export const {
  addQuestion,
  changeAnswer,
  changeTitle,
  changePage,
  changeQuestion,
  validateForm,
  removeQuestion,
  setSelectedAnswer,
} = createQuizSlice.actions;

export default createQuizSlice.reducer;
