import { DeleteBankAccountController } from "@/application/controllers";
import { makeDeleteBankAccountUseCase } from "@/main/factories/domain";

export const makeDeleteBankAccountController =
  (): DeleteBankAccountController => {
    return new DeleteBankAccountController(makeDeleteBankAccountUseCase());
  };
