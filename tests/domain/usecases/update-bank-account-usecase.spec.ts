import { beforeAll, beforeEach, describe, expect, it } from "@jest/globals";

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

  beforeAll(() => {
    mockBankAccountRepository.findById.mockResolvedValue({
      id: bankAccountId,
      color: "any_color",
      initialBalance: 0,
      name: "any_name",
      type: BankAccountType.CHECKING,
    });

    mockBankAccountRepository.update.mockResolvedValue({
      id: bankAccountId,
      color: "update_color",
      initialBalance: 0,
      name: "update_name",
      type: BankAccountType.CHECKING,
    });
  });

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

  it("Should throws if UserRepository.findById throws ", async () => {
    mockBankAccountRepository.findById.mockRejectedValueOnce(new Error());
    const promise = sut.execute(bankAccountId, bankAccountParams);
    await expect(promise).rejects.toThrow();
  });

  it("Should call BankAccountRepository.update with correct values", async () => {
    await sut.execute(bankAccountId, bankAccountParams);
    expect(mockBankAccountRepository.update).toHaveBeenCalledWith(
      bankAccountId,
      bankAccountParams
    );
  });

  it("Should throws if UserRepository.update throws ", async () => {
    mockBankAccountRepository.update.mockRejectedValueOnce(new Error());
    const promise = sut.execute(bankAccountId, bankAccountParams);
    await expect(promise).rejects.toThrow();
  });

  it("Should return the updated bank account on success", async () => {
    const response = await sut.execute(bankAccountId, bankAccountParams);
    expect(response).toEqual({
      id: bankAccountId,
      color: "update_color",
      initialBalance: 0,
      name: "update_name",
      type: BankAccountType.CHECKING,
    });
  });
});
