import { trimmer } from "./helpers";

describe("src/utils/helpers.ts", () => {
  test("Trimmer should remove whitespaces", () => {
    const string = " test";
    expect(trimmer(string)).toBe("test");
  });
});
