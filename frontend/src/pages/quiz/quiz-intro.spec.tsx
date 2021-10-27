import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { store } from "src/redux/store";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { QuizIntro } from "./quiz-intro";

describe("src/pages/quiz/quiz-intro.tsx", () => {
  afterEach(() => cleanup());

  test("Render QuizIntro component", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Theme>
          <QuizIntro description="Description test" />
        </Theme>
      </Provider>,
    );

    // We wait for the image to load
    const ligthBulbImage = screen.getByTestId("light-bulb-image");
    fireEvent.load(ligthBulbImage);

    expect(renderedComponent.container).toMatchSnapshot();
  });

  test("when QuizIntro doesn't have a description, we display 'This quiz doesn't have a descirption.'", () => {
    render(
      <Provider store={store}>
        <Theme>
          <QuizIntro />
        </Theme>
      </Provider>,
    );

    const text = screen.getByTestId("quiz-description");

    expect(text).toHaveTextContent("This quiz doesn't have a descirption.");
  });

  test("when pressing Start Quiz button, quiz should start", () => {
    render(
      <Provider store={store}>
        <Theme>
          <QuizIntro />
        </Theme>
      </Provider>,
    );

    expect(store.getState().quiz.quizStarted).toBeFalsy();

    const startButton = screen.getByText(/start quiz/i);
    fireEvent.click(startButton);

    expect(store.getState().quiz.quizStarted).toBeTruthy();
  });
});
