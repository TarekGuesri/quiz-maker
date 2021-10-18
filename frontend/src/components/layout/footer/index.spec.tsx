import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import { history } from "src/utils/history";
import { Navbar } from ".";

describe("src/components/layout/navbar", () => {
  afterEach(() => cleanup());

  test("Render Navbar component", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
        </Router>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });

  test("Check if dark mode changes after clicking the switch", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
        </Router>
      </Provider>,
    );

    const {
      ui: { darkMode: currentDarkMode },
    } = store.getState();

    const darkModeSwitch = screen.getByRole("checkbox", { name: /🌙/i });

    // Clicking on the switch button
    fireEvent.click(darkModeSwitch);

    expect(store.getState().ui.darkMode).toEqual(!currentDarkMode);
  });
});
