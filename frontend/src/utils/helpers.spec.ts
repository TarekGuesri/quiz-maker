import { cleanup } from "@testing-library/react";
import { timeFormatter } from "./helpers";

describe("src/utils/helpers.ts", () => {
  afterEach(() => cleanup());

  test("time formatter", () => {
    expect(timeFormatter(20, 2, 0)).toBe("02:20");

    expect(timeFormatter(20, 2, 1)).toBe("01:02:20");

    expect(timeFormatter(20, 2, 10)).toBe("10:02:20");
  });
});
