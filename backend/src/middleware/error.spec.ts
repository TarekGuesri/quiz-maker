import { Request, Response } from "express";

import { errorHandler } from "./error";

const mockRequest = (): Request => {
  const req = {} as unknown as Request;

  return req;
};

const mockResponse = (): Response => {
  const res = {} as unknown as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const next = jest.fn();

describe("src/middleware/error.spec.ts", () => {
  test("Mongoose bad ObjectId should return 404 with Resource not found message", async () => {
    const error = {
      name: "CastError",
    };

    const req = mockRequest();
    const res = mockResponse();

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Resource not found",
      success: false,
    });
  });
});
