import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { CreateBankAccountController } from "@/application/controllers";
import { MissingParamsError, UnauthorizedError } from "@/application/erros";
import { badRequest, unauthorized } from "@/application/helpers";
import { IHttpRequest } from "@/application/protocols";
import { BankAccountType } from "@/domain/entities";
import { ICreateBankAccount } from "@/domain/protocols";

describe("CreateBankAccount Controller", () => {
  const request: IHttpRequest = {
    body: {
      name: "any_name",
      initialBalance: 0,
      color: "any_color",
      type: "CHECKING",
    },
    userId: "user_id",
  };

  const mockCreateBankAccount: jest.Mocked<ICreateBankAccount> = {
    execute: jest.fn(),
  };

  let sut: CreateBankAccountController;

  beforeAll(() => {
    mockCreateBankAccount.execute.mockResolvedValue({
      id: "bank_account_id",
      name: "any_name",
      initialBalance: 0,
      color: "any_color",
      type: BankAccountType.CHECKING,
    });
  });

  beforeEach(() => {
    sut = new CreateBankAccountController(mockCreateBankAccount);
  });

  it("Should return 401 if no user id is provided", async () => {
    const httpResponse = await sut.handle({
      body: {},
      userId: "",
    });
    expect(httpResponse).toEqual(unauthorized(new UnauthorizedError()));
  });

  it("Should return 400 if no name is provided", async () => {
    const httpResponse = await sut.handle({
      body: {},
      userId: "user_id",
    });
    expect(httpResponse).toEqual(badRequest(new MissingParamsError("name")));
  });

  it("Should return 400 if no initialBalance is provided", async () => {
    const httpResponse = await sut.handle({
      body: {
        name: "any_name",
      },
      userId: "user_id",
    });
    expect(httpResponse).toEqual(
      badRequest(new MissingParamsError("initialBalance"))
    );
  });

  it("Should return 400 if no color is provided", async () => {
    const httpResponse = await sut.handle({
      body: {
        name: "any_name",
        initialBalance: 100,
      },
      userId: "user_id",
    });
    expect(httpResponse).toEqual(badRequest(new MissingParamsError("color")));
  });

  it("Should return 400 if no type is provided", async () => {
    const httpResponse = await sut.handle({
      body: {
        name: "any_name",
        initialBalance: 100,
        color: "any_color",
      },
      userId: "user_id",
    });
    expect(httpResponse).toEqual(badRequest(new MissingParamsError("type")));
  });
});
