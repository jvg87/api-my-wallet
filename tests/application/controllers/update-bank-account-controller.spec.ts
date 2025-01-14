import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { UpdateBankAccountController } from "@/application/controllers";
import {
  InvalidParamsError,
  MissingParamsError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from "@/application/erros";
import {
  badRequest,
  notFound,
  ok,
  serverError,
  unauthorized,
} from "@/application/helpers";
import { IHttpRequest } from "@/application/protocols";
import { BankAccountType } from "@/domain/entities";
import { IUpdateBankAccount } from "@/domain/protocols";

describe("UpdateBankAccount Controller", () => {
  const request: IHttpRequest = {
    body: {
      name: "any_name",
      initialBalance: 100,
      color: "any_color",
      type: "CHECKING",
    },
    userId: "user_id",
    params: {
      bankAccountId: "bank_account_id",
    },
  };

  const mockUpdateBankAccount: jest.Mocked<IUpdateBankAccount> = {
    execute: jest.fn(),
  };

  let sut: UpdateBankAccountController;

  beforeAll(() => {
    mockUpdateBankAccount.execute.mockResolvedValue({
      id: "bank_account_id",
      name: "update_name",
      initialBalance: 1000,
      color: "update_color",
      type: BankAccountType.CHECKING,
    });
  });

  beforeEach(() => {
    sut = new UpdateBankAccountController(mockUpdateBankAccount);
  });

  it("Should return 401 if no user id is provided", async () => {
    const httpResponse = await sut.handle({
      body: {},
      userId: "",
      params: {},
    });
    expect(httpResponse).toEqual(unauthorized(new UnauthorizedError()));
  });

  it("Should return 400 if no bankAccountId is provided", async () => {
    const httpResponse = await sut.handle({
      body: {
        name: "any_name",
        initialBalance: 100,
        color: "any_color",
        type: BankAccountType.CHECKING,
      },
      userId: "user_id",
      params: {
        bankAccountId: "",
      },
    });
    expect(httpResponse).toEqual(
      badRequest(new MissingParamsError("bankAccountId"))
    );
  });

  it("Should return 400 if no name is provided", async () => {
    const httpResponse = await sut.handle({
      body: {},
      userId: "user_id",
      params: {
        bankAccountId: "bank_account_id",
      },
    });
    expect(httpResponse).toEqual(badRequest(new MissingParamsError("name")));
  });

  it("Should return 400 if no initialBalance is provided", async () => {
    const httpResponse = await sut.handle({
      body: {
        name: "any_name",
      },
      userId: "user_id",
      params: {
        bankAccountId: "bank_account_id",
      },
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
      params: {
        bankAccountId: "bank_account_id",
      },
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
      params: {
        bankAccountId: "bank_account_id",
      },
    });
    expect(httpResponse).toEqual(badRequest(new MissingParamsError("type")));
  });

  it("Should return 400 if type provided is not valid", async () => {
    const httpResponse = await sut.handle({
      body: {
        name: "any_name",
        initialBalance: 100,
        color: "any_color",
        type: "any_type",
      },
      userId: "user_id",
      params: {
        bankAccountId: "bank_account_id",
      },
    });
    expect(httpResponse).toEqual(badRequest(new InvalidParamsError("type")));
  });

  it("Should call UpdateBankAccount with correct params", async () => {
    await sut.handle(request);
    expect(mockUpdateBankAccount.execute).toHaveBeenCalledWith(
      "bank_account_id",
      {
        name: "any_name",
        initialBalance: 100,
        color: "any_color",
        type: "CHECKING",
        userId: "user_id",
      }
    );
  });

  it("Should return 404 if UpdateBankAccount returns null", async () => {
    mockUpdateBankAccount.execute.mockResolvedValueOnce(null);
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(notFound(new NotFoundError()));
  });

  it("Should return 500 if UpdateBankAccount throws", async () => {
    mockUpdateBankAccount.execute.mockRejectedValueOnce(new ServerError());
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });

  it("Should return 200 if valid data is provided", async () => {
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(
      ok({
        id: "bank_account_id",
        name: "update_name",
        initialBalance: 1000,
        color: "update_color",
        type: BankAccountType.CHECKING,
      })
    );
  });
});
