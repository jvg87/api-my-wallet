import { beforeAll, beforeEach, describe, expect, it } from "@jest/globals";

import { BankAccountType } from "@/domain/entities";
import { GetAllBankAccountsUseCase } from "@/domain/usecases";
import { mockBankAccountRepository } from "@/tests/domain/mocks";

describe("GetAllBankAccounts UseCase", () => {
  const userId = "any_user_id";

  let sut: GetAllBankAccountsUseCase;

  beforeAll(() => {
    mockBankAccountRepository.findAllByUserId.mockResolvedValue([
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
    sut = new GetAllBankAccountsUseCase(mockBankAccountRepository);
  });

  it("Should call BankAccountRepository.findAllByUserId with correct userId", async () => {
    await sut.execute(userId);
    expect(mockBankAccountRepository.findAllByUserId).toHaveBeenCalledWith(
      userId
    );
  });
});
