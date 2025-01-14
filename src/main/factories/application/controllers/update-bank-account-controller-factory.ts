import { UpdateBankAccountController } from "@/application/controllers";
import { makeUpdateBankAccountUseCase } from "../../domain";

export const makeUpdateBankAccountController =
  (): UpdateBankAccountController => {
    return new UpdateBankAccountController(makeUpdateBankAccountUseCase());
  };
