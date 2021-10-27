import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { store } from "src/redux/store";
import { switchDarkMode } from "src/redux/ui/ui-slice";
import { CircularProgressWithLabel } from "./circular-progress-with-label";

describe("src/components/progress/circular-progress-with-label", () => {
  afterEach(() => cleanup());

  test("Render CircularProgressWithLabel component in light mode", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Theme>
          <CircularProgressWithLabel value={50} />
        </Theme>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });

  test("Render CircularProgressWithLabel component in dark mode", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Theme>
          <CircularProgressWithLabel value={50} />
        </Theme>
      </Provider>,
    );

    store.dispatch(switchDarkMode());

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
