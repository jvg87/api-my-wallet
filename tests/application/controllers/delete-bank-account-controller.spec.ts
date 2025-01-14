import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { DeleteBankAccountController } from "@/application/controllers";
import {
  MissingParamsError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from "@/application/erros";
import {
  badRequest,
  notFound,
  serverError,
  unauthorized,
} from "@/application/helpers";
import { IHttpRequest } from "@/application/protocols";
import { IDeleteBankAccount } from "@/domain/protocols";

describe("DeleteBankAccount Controller", () => {
  const request: IHttpRequest = {
    body: {},
    userId: "user_id",
    params: {
      bankAccountId: "bank_account_id",
    },
  };

  const mockDeleteAccount: jest.Mocked<IDeleteBankAccount> = {
    execute: jest.fn(),
  };

  let sut: DeleteBankAccountController;

  beforeEach(() => {
    sut = new DeleteBankAccountController(mockDeleteAccount);
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
      body: {},
      userId: "user_id",
      params: {
        bankAccountId: "",
      },
    });
    expect(httpResponse).toEqual(
      badRequest(new MissingParamsError("bankAccountId"))
    );
  });

  it("Should call DeleteBankAccount with correct params", async () => {
    await sut.handle(request);
    expect(mockDeleteAccount.execute).toHaveBeenCalledWith(
      "bank_account_id",
      "user_id"
    );
  });

  it("Should return 404 if DeleteBankAccount returns null", async () => {
    mockDeleteAccount.execute.mockResolvedValueOnce(null);
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(notFound(new NotFoundError()));
  });

  it("Should return 500 if DeleteBankAccount throws", async () => {
    mockDeleteAccount.execute.mockRejectedValueOnce(new ServerError());
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });
});
