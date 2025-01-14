import { beforeEach, describe, it } from "@jest/globals";

import { DeleteBankAccountUseCase } from "@/domain/usecases";

describe("DeleteBankAccount UseCase", () => {
  const userId = "any_user_id";
  const bankAccountId = "any_bank_account_id";

  let sut: DeleteBankAccountUseCase;

  beforeEach(() => {
    sut = new DeleteBankAccountUseCase();
  });
  it("Should call UserRepository.delete with correct values", async () => {});
});
