import { beforeAll, beforeEach, describe, expect, it } from "@jest/globals";

import { BankAccountType } from "@/domain/entities";
import { DeleteBankAccountUseCase } from "@/domain/usecases";
import { mockBankAccountRepository } from "@/tests/domain/mocks";

describe("DeleteBankAccount UseCase", () => {
  const userId = "any_user_id";
  const bankAccountId = "any_bank_account_id";

  let sut: DeleteBankAccountUseCase;

  beforeAll(() => {
    mockBankAccountRepository.findById.mockResolvedValue({
      id: bankAccountId,
      color: "any_color",
      initialBalance: 0,
      name: "any_name",
      type: BankAccountType.CHECKING,
    });
  });

  beforeEach(() => {
    sut = new DeleteBankAccountUseCase(mockBankAccountRepository);
  });

  it("Should call UserRepository.findById with correct values", async () => {
    await sut.execute(bankAccountId, userId);
    expect(mockBankAccountRepository.findById).toHaveBeenCalledWith(
      bankAccountId
    );
  });

  it("Should return null if no bank account is found", async () => {
    mockBankAccountRepository.findById.mockResolvedValueOnce(null);
    const response = await sut.execute(bankAccountId, userId);
    expect(response).toBeNull();
  });
});
