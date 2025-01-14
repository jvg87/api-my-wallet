import { UpdateBankAccountController } from "@/application/controllers";
import { makeUpdateBankAccountUseCase } from "@/main/factories/domain";

export const makeUpdateBankAccountController =
  (): UpdateBankAccountController => {
    return new UpdateBankAccountController(makeUpdateBankAccountUseCase());
  };
