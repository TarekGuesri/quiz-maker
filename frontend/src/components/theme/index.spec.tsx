import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import { Theme } from ".";
import { switchDarkMode } from "src/redux/ui/ui-slice";

describe("src/components/theme", () => {
  afterEach(() => cleanup());

  test("Render Theme component when darkMode is false", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Theme>Test </Theme>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });

  test("Render Theme component when darkMode is true", () => {
    store.dispatch(switchDarkMode());

    const renderedComponent = render(
      <Provider store={store}>
        <Theme>Test </Theme>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
