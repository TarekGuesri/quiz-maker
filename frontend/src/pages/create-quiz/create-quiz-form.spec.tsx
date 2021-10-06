import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { store } from "src/redux/store";

import { CreateQuizForm } from "./create-quiz-form";

describe("src/components/create-quiz-form.tsx", () => {
  afterEach(() => cleanup());

  test("Render CreateQuizForm component", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Theme>
          <CreateQuizForm />
        </Theme>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
