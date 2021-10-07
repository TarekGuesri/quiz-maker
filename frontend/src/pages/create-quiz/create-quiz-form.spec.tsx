import React from "react";
import axios from "axios";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { store } from "src/redux/store";

import { CreateQuizForm } from "./create-quiz-form";

jest.mock("axios");

describe("src/components/create-quiz-form.tsx", () => {
  afterEach(() => cleanup());

  test("Form should be empty on mount", () => {
    render(
      <Provider store={store}>
        <Theme>
          <CreateQuizForm />
        </Theme>
      </Provider>,
    );

    // Quiz title
    const quizTitleInput = screen.getByTestId("quiz-title");
    expect(quizTitleInput).toHaveDisplayValue("");

    // Question content
    const questionContentInput = screen.getByTestId("question-content");
    expect(questionContentInput).toHaveDisplayValue("");

    // Answers' text
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`answer-text-${i}`)).toHaveDisplayValue("");
    }
  });

  test("Form can't be submitted when fields are empty and get quizID when submitting", async () => {
    (axios as jest.Mocked<typeof axios>).post.mockResolvedValue({
      data: "test",
    });

    render(
      <Provider store={store}>
        <Theme>
          <CreateQuizForm />
        </Theme>
      </Provider>,
    );

    /*  Filling Form */

    // Quiz title
    const quizTitleInput = screen.getByTestId("quiz-title");
    fireEvent.change(quizTitleInput, { target: { value: "React Quiz" } });
    expect(quizTitleInput).toHaveDisplayValue("React Quiz");

    // Question content
    const questionContentInput = screen.getByTestId("question-content");
    fireEvent.change(questionContentInput, {
      target: { value: "First Question" },
    });
    expect(questionContentInput).toHaveDisplayValue("First Question");

    // Answers' text
    for (let i = 1; i <= 4; i++) {
      const answer = screen.getByTestId(`answer-text-${i}`);
      const answerText = `Answer ${i}`;

      fireEvent.change(answer, {
        target: { value: answerText },
      });
      expect(answer).toHaveDisplayValue(answerText);

      // Selecting 3rd answer
      if (i === 3) {
        const thirdAnswerRadio = screen.getByTestId("answer-radio-3");

        fireEvent.click(thirdAnswerRadio);

        expect(thirdAnswerRadio).toBeChecked();
      }
    }

    // Creating quiz
    const createButton = screen.getByRole("button", {
      name: /create quiz/i,
    });

    fireEvent.click(createButton);

    expect(createButton).toBeDisabled();

    await waitFor(() => screen.getByTestId("upload-button-loading-false"));

    expect(createButton).toBeEnabled();

    expect(store.getState().createQuiz.quizID).toEqual("test");
  });

  test("Test quiz pagination", async () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <Theme>
          <CreateQuizForm />
        </Theme>
      </Provider>,
    );

    /*  
    Checking remove question button disability on mount 
    */
    const removeQuestionButton = screen.getByRole("button", {
      name: /remove question/i,
    });

    expect(removeQuestionButton).toBeDisabled();

    /* 
  Add question button should be enabled on mount 
      */
    const addQuestionButton = screen.getByRole("button", {
      name: /add a question/i,
    });

    expect(addQuestionButton).toBeEnabled();
    /* 
      Adding 9 questions, addQuestionButton should be disabled when there are 10 questions
      */
    for (let questionNumber = 2; questionNumber <= 10; questionNumber++) {
      fireEvent.click(addQuestionButton);

      if (questionNumber < 10) {
        expect(addQuestionButton).toBeEnabled();
      } else {
        expect(addQuestionButton).toBeDisabled();
      }
    }
    /* 
    Removing a question
     */
    const pageTenButton = screen.getByTestId("page-10");
    expect(pageTenButton).toBeTruthy();

    fireEvent.click(removeQuestionButton);

    expect(queryByTestId("page-10")).toBeNull();

    /* 
    Changing question page
     */

    // Since we deleted the 10th page, the 9th page should be selected
    expect(screen.getByTestId("page-9")).toHaveClass("Mui-selected");

    // Changing page to 8
    const pageEightButton = screen.getByTestId("page-8");
    fireEvent.click(pageEightButton);
    expect(pageEightButton).toHaveClass("Mui-selected");
  });
});
