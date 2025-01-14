import { UpdateBankAccountUseCase } from "@/domain/usecases";
import { PrismaBankAccountRepository } from "@/infra/repositories";

export const makeUpdateBankAccountUseCase = (): UpdateBankAccountUseCase => {
  const bankAccountRepository = new PrismaBankAccountRepository();
  return new UpdateBankAccountUseCase(bankAccountRepository);
};
