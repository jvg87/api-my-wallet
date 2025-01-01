import { CreateUserController } from "@/application/controllers";
import {
  EmailAlreadyExistsError,
  MissingParamsError,
} from "@/application/erros";
import { badRequest, conflict } from "@/application/helpers";
import { IHttpRequest } from "@/application/protocols";
import { ICreateUser } from "@/domain/protocols";

import { beforeEach, describe, expect, it, jest } from "@jest/globals";

describe("CreateUser Controller", () => {
  const request: IHttpRequest = {
    body: {
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    },
  };

  const createUserMock: jest.Mocked<ICreateUser> = {
    execute: jest.fn(),
  };
  let sut: CreateUserController;

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
});
