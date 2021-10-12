describe("src/utils/secrets.ts", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "dev";
  });

  test("Testing production environment", () => {
    process.env.NODE_ENV = "production";

    import("./secrets").then((secrets) => {
      const { ENVIRONMENT } = secrets;

      expect(ENVIRONMENT).toBe("production");
    });
  });
});
