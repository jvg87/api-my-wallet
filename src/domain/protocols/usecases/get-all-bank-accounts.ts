import { BankAccount } from "@prisma/client";

export interface IGetAllBankAccounts {
  execute(userId: string): Promise<BankAccount[] | null>;
}
