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
  test("Mongoose bad ObjectId should return 404 with 'Resource not found' message", async () => {
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

  test("Mongoose duplicate key should return 400 with 'Duplicate field value entered' message", async () => {
    const error = {
      code: 11000,
    };

    const req = mockRequest();
    const res = mockResponse();

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Duplicate field value entered",
      success: false,
    });
  });

  test("Mongoose validation error should return 400 with a message that contains the fields' error messages", async () => {
    const error = {
      name: "ValidationError",
      errors: [{ message: "Test Error 1" }, { message: "Test Error 2" }],
    };

    const req = mockRequest();
    const res = mockResponse();

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Test Error 1. Test Error 2",
      success: false,
    });
  });

  test("Unhandled errors should return 500 with 'Server Error' message", async () => {
    const error = {};

    const req = mockRequest();
    const res = mockResponse();

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Server Error",
      success: false,
    });
  });
});
