import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { GetUserController } from "@/application/controllers";
import { ServerError, UnauthorizedError } from "@/application/erros";
import { ok, serverError, unauthorized } from "@/application/helpers";
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

  it("Should return 200 if valid id is provided", async () => {
    const response = await sut.handle(request);
    const user = await mockGetUser.execute("user_id");
    expect(response).toEqual(ok(user));
  });

  it("Should returns 500 if GetUser throws", async () => {
    mockGetUser.execute.mockRejectedValueOnce(new ServerError());
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });
});
