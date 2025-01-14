import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { DeleteBankAccountController } from "@/application/controllers";
import { UnauthorizedError } from "@/application/erros";
import { unauthorized } from "@/application/helpers";
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
    sut = new DeleteBankAccountController();
  });

  it("Should return 401 if no user id is provided", async () => {
    const httpResponse = await sut.handle({
      body: {},
      userId: "",
      params: {},
    });
    expect(httpResponse).toEqual(unauthorized(new UnauthorizedError()));
  });
});
