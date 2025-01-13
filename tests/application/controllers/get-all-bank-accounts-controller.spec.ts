import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { GetAllBankAccountsController } from "@/application/controllers";
import { ServerError, UnauthorizedError } from "@/application/erros";
import { ok, serverError, unauthorized } from "@/application/helpers";
import { IHttpRequest } from "@/application/protocols";
import { BankAccountType } from "@/domain/entities";
import { IGetAllBankAccounts } from "@/domain/protocols";

describe("GetAllBankAccounts Controller", () => {
  const request: IHttpRequest = {
    body: {},
    userId: "user_id",
  };

  const mockGetAllBankAccounts: jest.Mocked<IGetAllBankAccounts> = {
    execute: jest.fn(),
  };

  let sut: GetAllBankAccountsController;

  beforeAll(() => {
    mockGetAllBankAccounts.execute.mockResolvedValue([
      {
        color: "any_color",
        id: "any_id",
        name: "any_name",
        initialBalance: 1000,
        type: BankAccountType.CASH,
      },
      {
        color: "other_color",
        id: "other_id",
        name: "other_name",
        initialBalance: 100,
        type: BankAccountType.CHECKING,
      },
    ]);
  });

  beforeEach(() => {
    sut = new GetAllBankAccountsController(mockGetAllBankAccounts);
  });

  it("Should return 401 if no user id is provided", async () => {
    const httpResponse = await sut.handle({
      body: {},
      userId: "",
    });
    expect(httpResponse).toEqual(unauthorized(new UnauthorizedError()));
  });

  it("Should call GetAllBankAccounts method with correct id", async () => {
    await sut.handle(request);
    expect(mockGetAllBankAccounts.execute).toHaveBeenCalledWith("user_id");
  });

  it("Should return 200 if valid id is provided", async () => {
    const response = await sut.handle(request);
    const bankAccounts =
      await mockGetAllBankAccounts.execute("bankAccounts_id");
    expect(response).toEqual(ok(bankAccounts));
  });

  it("Should returns 500 if GetAllBankAccounts throws", async () => {
    mockGetAllBankAccounts.execute.mockRejectedValueOnce(new ServerError());
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });
});
