import { beforeEach, describe, expect, it } from "@jest/globals";

import { UnauthorizedError } from "@/application/erros";
import { unauthorized } from "@/application/helpers";
import { AuthMiddleware } from "@/application/middlewares";
import { IRequest } from "@/application/protocols";

describe("Auth Middleware", () => {
  const mockRequest: IRequest = {
    headers: {
      authorization: "bearer valid_token",
    },
  };

  let sut: AuthMiddleware;

  beforeEach(() => {
    sut = new AuthMiddleware();
  });

  it("Should return 401 if no authorization is provided", async () => {
    const response = await sut.handle({
      headers: {},
    });
    expect(response).toEqual(unauthorized(new UnauthorizedError()));
  });
});
