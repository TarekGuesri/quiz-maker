import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Footer } from ".";

describe("src/components/layout/footer", () => {
  afterEach(() => cleanup());

  test("Render Footer component", () => {
    const renderedComponent = render(<Footer />);

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
