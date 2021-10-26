/**
 * @jest-environment jsdom
 */
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Loading } from ".";
import { Theme } from "src/components/theme";
import { Provider } from "react-redux";
import { store } from "src/redux/store";

describe("src/components/loading/index.tsx", () => {
  afterEach(() => cleanup());

  test("Render Loading component", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Theme>
          <Loading />
        </Theme>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
