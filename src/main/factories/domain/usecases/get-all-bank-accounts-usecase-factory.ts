import { GetAllBankAccountsUseCase } from "@/domain/usecases";
import { PrismaBankAccountRepository } from "@/infra/repositories";

export const makeGetAllBankAccountsUseCase = (): GetAllBankAccountsUseCase => {
  const bankAccountRepository = new PrismaBankAccountRepository();
  return new GetAllBankAccountsUseCase(bankAccountRepository);
};
