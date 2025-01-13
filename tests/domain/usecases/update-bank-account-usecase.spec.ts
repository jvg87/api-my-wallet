import { beforeEach, describe, expect, it } from "@jest/globals";

import { BankAccountType } from "@/domain/entities";
import { UpdateBankAccountUseCase } from "@/domain/usecases";
import { mockBankAccountRepository } from "@/tests/domain/mocks";

describe("UpdateBankAccount UseCase", () => {
  const userId = "any_user_id";
  const bankAccountId = "any_bank_account_id";
  const bankAccountParams = {
    userId,
    color: "any_color",
    initialBalance: 0,
    name: "any_name",
    type: BankAccountType.CHECKING,
  };

  let sut: UpdateBankAccountUseCase;

  beforeEach(() => {
    sut = new UpdateBankAccountUseCase(mockBankAccountRepository);
  });
  it("Should call BankAccountRepository.findById with correct id", async () => {
    await sut.execute(bankAccountId, bankAccountParams);
    expect(mockBankAccountRepository.findById).toHaveBeenCalledWith(
      bankAccountId
    );
  });

  it("Should return null if no bank account is found", async () => {
    mockBankAccountRepository.findById.mockResolvedValueOnce(null);
    const response = await sut.execute(bankAccountId, bankAccountParams);
    expect(response).toBeNull();
  });
});
