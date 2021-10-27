import React from "react";
import { cleanup, render, screen, act } from "@testing-library/react";
import { store } from "src/redux/store";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { Timer } from "./timer";

describe("src/pages/quiz/quiz-test/timer.tsx", () => {
  afterEach(() => cleanup());

  test("Render Progress component", async () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setInterval");
    render(
      <Provider store={store}>
        <Theme>
          <Timer />
        </Theme>
      </Provider>,
    );

    const timer = screen.getByTestId("quiz-timer");

    // counter starts from 00:00
    expect(timer.innerHTML).toEqual("00:00");

    // After 1 second, it should be 00:01
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timer.innerHTML).toEqual("00:01");

    // After 59 second, it should be 01:00
    act(() => {
      jest.advanceTimersByTime(59 * 1000);
    });
    expect(timer.innerHTML).toEqual("01:00");

    // After 59 minutes, it should be 01:00:00
    act(() => {
      jest.advanceTimersByTime(59 * 60 * 1000);
    });
    expect(timer.innerHTML).toEqual("01:00:00");
  });
});
