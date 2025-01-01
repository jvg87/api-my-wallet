import { CreateUserController } from "@/application/controllers";
import { MissingParamsError } from "@/application/erros";
import { badRequest } from "@/application/helpers";
import { IHttpRequest } from "@/application/protocols";
import { beforeEach, describe, expect, it } from "@jest/globals";

describe("CreateUser Controller", () => {
  let sut: CreateUserController;

  beforeEach(() => {
    sut = new CreateUserController();
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
});
