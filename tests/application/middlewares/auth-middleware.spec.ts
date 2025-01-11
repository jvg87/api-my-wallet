import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { UnauthorizedError } from "@/application/erros";
import { ok, serverError, unauthorized } from "@/application/helpers";
import { AuthMiddleware } from "@/application/middlewares";
import { IRequest } from "@/application/protocols";
import { IDecrypter } from "@/domain/protocols";

describe("Auth Middleware", () => {
  const mockRequest: IRequest = {
    headers: {
      authorization: "bearer valid_token",
    },
  };

  const mockDecrypter: jest.Mocked<IDecrypter> = {
    decrypt: jest.fn(),
  };

  let sut: AuthMiddleware;

  beforeEach(() => {
    sut = new AuthMiddleware(mockDecrypter);
  });

  beforeAll(() => {
    mockDecrypter.decrypt.mockResolvedValue({
      sub: "user_id",
    });
  });

  it("Should return 401 if no authorization is provided", async () => {
    const response = await sut.handle({
      headers: {},
    });
    expect(response).toEqual(unauthorized(new UnauthorizedError()));
  });

  it("Should call decrypter with valid token", async () => {
    await sut.handle(mockRequest);
    expect(mockDecrypter.decrypt).toHaveBeenCalledWith("valid_token");
  });

  it("Should return 401 if decrypter returns null", async () => {
    mockDecrypter.decrypt.mockResolvedValueOnce(null);
    const response = await sut.handle(mockRequest);
    expect(response).toEqual(unauthorized(new UnauthorizedError()));
  });

  it("Should return 200 if success", async () => {
    const result = await sut.handle(mockRequest);
    const payload = await mockDecrypter.decrypt("valid_token");
    expect(result).toEqual(ok({ userId: payload?.sub }));
  });

  it("Should return 500 if decrypter throws", async () => {
    mockDecrypter.decrypt.mockRejectedValueOnce(new Error());
    const result = await sut.handle(mockRequest);
    expect(result).toEqual(serverError(new Error()));
  });
});
