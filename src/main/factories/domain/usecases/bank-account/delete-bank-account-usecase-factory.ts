import { DeleteBankAccountUseCase } from "@/domain/usecases";
import { PrismaBankAccountRepository } from "@/infra/repositories";

export const makeDeleteBankAccountUseCase = (): DeleteBankAccountUseCase => {
  const prismaBankAccountRepo = new PrismaBankAccountRepository();
  return new DeleteBankAccountUseCase(prismaBankAccountRepo);
};
