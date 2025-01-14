import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { UpdateBankAccountController } from "@/application/controllers";
import { UnauthorizedError } from "@/application/erros";
import { unauthorized } from "@/application/helpers";
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
  };

  const mockUpdateBankAccount: jest.Mocked<IUpdateBankAccount> = {
    execute: jest.fn(),
  };

  let sut: UpdateBankAccountController;

  beforeAll(() => {
    mockUpdateBankAccount.execute.mockResolvedValue({
      id: "update_bank_account_id",
      name: "update_name",
      initialBalance: 1000,
      color: "update_color",
      type: BankAccountType.CHECKING,
    });
  });

  beforeEach(() => {
    sut = new UpdateBankAccountController();
  });

  it("Should return 401 if no user id is provided", async () => {
    const httpResponse = await sut.handle({
      body: {},
      userId: "",
    });
    expect(httpResponse).toEqual(unauthorized(new UnauthorizedError()));
  });
});
