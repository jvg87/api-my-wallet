import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { CreateUserController } from "@/application/controllers";
import {
  EmailAlreadyExistsError,
  MissingParamsError,
  ServerError,
} from "@/application/erros";
import {
  badRequest,
  conflict,
  created,
  serverError,
} from "@/application/helpers";
import { IHttpRequest } from "@/application/protocols";
import { User } from "@/domain/entities";
import { ICreateUser } from "@/domain/protocols";

describe("CreateUser Controller", () => {
  const request: IHttpRequest = {
    body: {
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    },
  };

  const user: User = {
    id: "user_id",
    email: "user_email@mail.com",
    name: "user_name",
    password: "hashed_password",
  };

  const createUserMock: jest.Mocked<ICreateUser> = {
    execute: jest.fn(),
  };
  let sut: CreateUserController;

  beforeAll(() => {
    createUserMock.execute.mockResolvedValue(user);
  });

  beforeEach(() => {
    sut = new CreateUserController(createUserMock);
  });

  it("Should return 400 if no name is provided", async () => {
    const request: IHttpRequest = {
      body: {},
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(badRequest(new MissingParamsError("name")));
  });

  it("Should return 400 if no email is provided", async () => {
    const request: IHttpRequest = {
      body: {
        name: "any_name",
      },
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(badRequest(new MissingParamsError("email")));
  });

  it("Should return 400 if no password is provided", async () => {
    const request: IHttpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
      },
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(
      badRequest(new MissingParamsError("password"))
    );
  });

  it("Should call CreteUser with correct values", async () => {
    await sut.handle(request);
    const executeSpy = jest.spyOn(createUserMock, "execute");
    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith(request.body);
  });

  it("Should return 409 if CreateUser returns null", async () => {
    jest.spyOn(createUserMock, "execute").mockResolvedValueOnce(null);
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(conflict(new EmailAlreadyExistsError()));
  });

  it("Should return 201 if valid data is provided", async () => {
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(created());
  });

  it("Should returns 500 if CreateUser throws", async () => {
    jest
      .spyOn(createUserMock, "execute")
      .mockRejectedValueOnce(new ServerError());
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });
});
