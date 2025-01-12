import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { GetUserController } from "@/application/controllers";
import { UnauthorizedError } from "@/application/erros";
import { unauthorized } from "@/application/helpers";
import { IHttpRequest } from "@/application/protocols";
import { IGetUser } from "@/domain/protocols";

describe("GetUser Controller", () => {
  const request: IHttpRequest = {
    body: {},
    userId: "user_id",
  };

  const mockGetUser: jest.Mocked<IGetUser> = {
    execute: jest.fn(),
  };

  let sut: GetUserController;

  beforeAll(() => {
    mockGetUser.execute.mockResolvedValue({
      email: "user_email@mail.com",
      name: "user_name",
    });
  });

  beforeEach(() => {
    sut = new GetUserController(mockGetUser);
  });

  it("Should return 401 if no user id is provided", async () => {
    const httpResponse = await sut.handle({
      body: {},
      userId: "",
    });
    expect(httpResponse).toEqual(unauthorized(new UnauthorizedError()));
  });

  it("Should call GetUser method with correct id", async () => {
    await sut.handle(request);
    const spy = jest.spyOn(mockGetUser, "execute");
    expect(spy).toHaveBeenCalledWith("user_id");
  });
});
