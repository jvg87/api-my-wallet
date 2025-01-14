import { CreateBankAccountUseCase } from "@/domain/usecases";
import { PrismaBankAccountRepository } from "@/infra/repositories";

export const makeCreateBankAccountUseCase = (): CreateBankAccountUseCase => {
  const bankAccountRepo = new PrismaBankAccountRepository();
  return new CreateBankAccountUseCase(bankAccountRepo);
};
