import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Footer } from ".";

describe("src/components/layout/navbar", () => {
  afterEach(() => cleanup());

  test("Render Fotter component", () => {
    const renderedComponent = render(<Footer />);

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
