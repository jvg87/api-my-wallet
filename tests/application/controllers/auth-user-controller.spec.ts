import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { AuthUserController } from "@/application/controllers";
import { MissingParamsError } from "@/application/erros";
import { badRequest } from "@/application/helpers";
import { IHttpRequest } from "@/application/protocols";
import { IAuthUser } from "@/domain/protocols";
import { mockAuthUser } from "@/tests/domain/mocks";

describe("AuthUser Controller", () => {
  const mockAuthUserUseCase: jest.Mocked<IAuthUser> = {
    execute: jest.fn(),
  };

  let sut: AuthUserController;

  beforeAll(() => {
    mockAuthUserUseCase.execute.mockResolvedValue(mockAuthUser());
  });

  beforeEach(() => {
    sut = new AuthUserController();
  });

  it("Should return 400 if no email is provided ", async () => {
    const request: IHttpRequest = {
      body: {},
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(badRequest(new MissingParamsError("email")));
  });

  it("Should return 400 if no password is provided ", async () => {
    const request: IHttpRequest = {
      body: {
        email: "any_email@mail.com",
      },
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(
      badRequest(new MissingParamsError("password"))
    );
  });
});
