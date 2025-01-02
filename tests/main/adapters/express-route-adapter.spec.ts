import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { NextFunction, Request, RequestHandler, Response } from "express";

import { IController } from "@/application/protocols";
import { expressRouteAdapter } from "@/main/adapters";

describe("ExpressRouteAdapter", () => {
  const mockController: jest.Mocked<IController> = {
    handle: jest.fn(),
  };

  let req: Request;
  let res: Response;
  let next: NextFunction;
  let sut: RequestHandler;

  beforeAll(() => {
    mockController.handle.mockResolvedValue({
      statusCode: 200,
      body: { key: "string" },
    });

    req = { body: { key: "string" } } as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    next = {} as NextFunction;
  });

  beforeEach(() => {
    sut = expressRouteAdapter(mockController);
  });

  it("Should call handle with correct request", async () => {
    await sut(req, res, next);
    expect(mockController.handle).toHaveBeenCalledTimes(1);
    expect(mockController.handle).toHaveBeenCalledWith({
      body: { key: "string" },
    });
  });

  it("Should call handle with empty request", async () => {
    const req = {} as Request;
    await sut(req, res, next);
    expect(mockController.handle).toHaveBeenCalledTimes(1);
    expect(mockController.handle).toHaveBeenCalledWith({});
  });

  it("Should respond with 200 and valid data", async () => {
    await sut(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ key: "string" });
  });

  it("Should respond with 204 and empty data", async () => {
    mockController.handle.mockResolvedValueOnce({
      statusCode: 204,
      body: undefined,
    });
    await sut(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(undefined);
  });

  it("Should respond with 400 and valid", async () => {
    mockController.handle.mockResolvedValueOnce({
      statusCode: 400,
      body: {
        error: new Error("any_error").message,
      },
    });
    await sut(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: "any_error" });
  });

  it("Should respond with 500 and valid error", async () => {
    mockController.handle.mockResolvedValueOnce({
      statusCode: 500,
      body: {
        error: new Error("any_error").message,
      },
    });
    await sut(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: "any_error" });
  });
});
