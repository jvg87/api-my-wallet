import { BankAccount, BankAccountType } from "@prisma/client";
import { IGetAllBankAccounts } from "../protocols";

export class GetAllBankAccountsUseCase implements IGetAllBankAccounts {
  async execute(userId: string): Promise<BankAccount[] | null> {
    return [
      {
        id: "string",
        userId: "string",
        name: "string",
        initialBalance: 0,
        color: "string",
        type: BankAccountType.CHECKING,
      },
    ];
  }
}
