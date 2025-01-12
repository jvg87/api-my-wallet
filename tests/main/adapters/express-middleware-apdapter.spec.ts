import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { Request, RequestHandler, Response } from "express";

import { IMiddleware } from "@/application/protocols";
import { expressMiddlewareAdapter } from "@/main/adapters";

describe("ExpressMiddlewareAdapter", () => {
  const mockMiddleware: jest.Mocked<IMiddleware> = {
    handle: jest.fn(),
  };

  let req: Request;
  let res: Response;
  let next: jest.Mock;
  let sut: RequestHandler;

  beforeAll(() => {
    mockMiddleware.handle.mockResolvedValue({
      statusCode: 200,
      body: {
        userId: "user_id",
      },
    });

    req = { headers: { authorization: "valid_token" } } as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });

  beforeEach(() => {
    sut = expressMiddlewareAdapter(mockMiddleware);
  });

  it("Should call handle with correct request", async () => {
    await sut(req, res, next);
    expect(mockMiddleware.handle).toHaveBeenCalledTimes(1);
    expect(mockMiddleware.handle).toHaveBeenCalledWith({
      headers: { authorization: "valid_token" },
    });
  });

  it("Should return statusCode and body if statusCode is not 200", async () => {
    mockMiddleware.handle.mockResolvedValueOnce({
      statusCode: 400,
      body: {
        error: "any_error",
      },
    });
    await sut(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "any_error" });
  });

  it("Should add req.userId if statusCode is 200", async () => {
    await sut(req, res, next);
    expect(req.userId).toBe("user_id");
  });

  it("Should call next if statusCode is 200", async () => {
    await sut(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
