import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { CreateBankAccountController } from "@/application/controllers";
import { UnauthorizedError } from "@/application/erros";
import { unauthorized } from "@/application/helpers";
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
});
