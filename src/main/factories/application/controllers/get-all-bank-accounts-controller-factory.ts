import { GetAllBankAccountsController } from "@/application/controllers";
import { makeGetAllBankAccountsUseCase } from "@/main/factories/domain";

export const makeGetAllBankAccountsController =
  (): GetAllBankAccountsController => {
    const getAllBankAccounts = makeGetAllBankAccountsUseCase();
    return new GetAllBankAccountsController(getAllBankAccounts);
  };
