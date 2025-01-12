import { beforeAll, beforeEach, describe, expect, it } from "@jest/globals";

import { BankAccountType } from "@/domain/entities";
import { CreateBankAccountUseCase } from "@/domain/usecases";
import { mockBankAccountRepository } from "@/tests/domain/mocks";

describe("CreateBankAccount UseCase", () => {
  const bankAccountParams = {
    userId: "any_user_id",
    color: "any_color",
    initialBalance: 0,
    name: "any_name",
    type: BankAccountType.CHECKING,
  };

  let sut: CreateBankAccountUseCase;

  beforeAll(() => {
    mockBankAccountRepository.create.mockResolvedValue({
      id: "any_id",
      color: "any_color",
      initialBalance: 0,
      name: "any_name",
      type: BankAccountType.CHECKING,
    });
  });

  beforeEach(() => {
    sut = new CreateBankAccountUseCase(mockBankAccountRepository);
  });

  it("Should return null if no userId is provided", async () => {
    const response = await sut.execute({
      color: "",
      initialBalance: 0,
      name: "",
      type: BankAccountType.CASH,
      userId: "",
    });
    expect(response).toBeNull();
  });

  it("Should call BankAccountRepository.create with correct values", async () => {
    await sut.execute(bankAccountParams);
    expect(mockBankAccountRepository.create).toHaveBeenCalledWith(
      bankAccountParams
    );
  });

  it("Should throw if UserRepository.create throws", async () => {
    mockBankAccountRepository.create.mockRejectedValueOnce(
      new Error("any_error")
    );
    const promise = sut.execute(bankAccountParams);
    await expect(promise).rejects.toThrow(new Error("any_error"));
  });

  it("Should return a new bank account if success", async () => {
    const bankAccount = await sut.execute(bankAccountParams);
    expect(bankAccount).toEqual({
      id: "any_id",
      color: "any_color",
      initialBalance: 0,
      name: "any_name",
      type: BankAccountType.CHECKING,
    });
  });
});
