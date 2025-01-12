import { beforeEach, describe, expect, it } from "@jest/globals";

import { BankAccountType } from "@/domain/entities";
import { CreateBankAccountUseCase } from "@/domain/usecases";

describe("CreateBankAccount UseCase", () => {
  let sut: CreateBankAccountUseCase;

  beforeEach(() => {
    sut = new CreateBankAccountUseCase();
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

  it("Should call BankAccountRepository.create with correct values", async () => {});
});
