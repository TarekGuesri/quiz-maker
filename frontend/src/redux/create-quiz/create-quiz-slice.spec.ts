import { cleanup } from "@testing-library/react";
import axios from "axios";
import { store } from "src/redux/store";
import {
  removeQuestion,
  addQuestion,
  changePage,
  resetState,
  changeTitle,
  changeQuestion,
  changeAnswer,
  validateForm,
  createQuiz,
} from "./create-quiz-slice";

jest.mock("axios");

describe("src/redux/create-quiz/create-quiz-slice.ts", () => {
  afterEach(() => cleanup());
  beforeEach(() => {
    store.dispatch(resetState());
  });

  test("When we remove a question while not selecting the last question, the question index shound remain the same", () => {
    // Current index should be 0 and there should be 1 question
    expect(store.getState().createQuiz.questionIndex).toBe(0);
    expect(store.getState().createQuiz.questions.length).toBe(1);

    // Adding 3 questions
    store.dispatch(addQuestion());
    store.dispatch(addQuestion());
    store.dispatch(addQuestion());

    // Current index should be 3
    expect(store.getState().createQuiz.questionIndex).toBe(3);

    // Changing index to the 2nd question (index 1)
    store.dispatch(changePage(1));

    // We remove the 2nd question, and the index should remain the same
    store.dispatch(removeQuestion());
    expect(store.getState().createQuiz.questionIndex).toBe(1);

    // After deletion there should be 3 questions left
    expect(store.getState().createQuiz.questions.length).toBe(3);
  });

  test("Testing form validation", () => {
    // Title can't be empty
    store.dispatch(validateForm());
    expect(store.getState().createQuiz.errorMessage).toBe(
      "Quiz title can't be empty",
    );
    expect(store.getState().createQuiz.isValid).toBe(false);

    // Filling title
    store.dispatch(changeTitle("Quiz Title"));

    // Question content can't be empty
    store.dispatch(validateForm());
    expect(store.getState().createQuiz.errorMessage).toBe(
      'Please fill in all the fields of the questions "1"',
    );
    expect(store.getState().createQuiz.isValid).toBe(false);

    // Filling question content
    store.dispatch(changeQuestion("Question 1"));

    // Answers can't be empty
    store.dispatch(validateForm());
    expect(store.getState().createQuiz.errorMessage).toBe(
      'Please fill in all the fields of the questions "1"',
    );
    expect(store.getState().createQuiz.isValid).toBe(false);

    // Filling answers
    store
      .getState()
      .createQuiz.questions[0].answers.forEach((answer, index) => {
        store.dispatch(
          changeAnswer({ name: answer.id, value: index.toString() }),
        );
      });

    // Form should be valid without an errorMessage
    store.dispatch(validateForm());
    expect(store.getState().createQuiz.isValid).toBe(true);
    expect(store.getState().createQuiz.errorMessage).toBe("");
  });

  test("Checking error message when error repsone doesn't have a message when creating a form", async () => {
    // Filling form
    store.dispatch(changeTitle("Quiz Title"));
    store.dispatch(changeQuestion("Question 1"));
    store
      .getState()
      .createQuiz.questions[0].answers.forEach((answer, index) => {
        store.dispatch(
          changeAnswer({ name: answer.id, value: index.toString() }),
        );
      });

    // Getting failed requestion without a repsonse value
    (axios as jest.Mocked<typeof axios>).post.mockRejectedValue({});

    await store.dispatch(createQuiz());

    expect(store.getState().createQuiz.errorMessage).toBe(
      "Something unexpected happend!",
    );
  });

  test("createForm shouldn't do anything when form is not valid", async () => {
    await store.dispatch(createQuiz());

    // There should be an error message and quizID should be empty
    expect(store.getState().createQuiz.isValid).toBe(false);
    expect(store.getState().createQuiz.errorMessage).not.toBe("");
    expect(store.getState().createQuiz.quizID).toBe("");
  });
});
