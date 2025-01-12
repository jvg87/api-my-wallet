import { CreateBankAccountController } from "@/application/controllers";
import { makeCreateBankAccountUseCase } from "@/main/factories/domain";

export const makeCreateBankAccountController =
  (): CreateBankAccountController => {
    const createBankAccountUseCase = makeCreateBankAccountUseCase();
    return new CreateBankAccountController(createBankAccountUseCase);
  };
