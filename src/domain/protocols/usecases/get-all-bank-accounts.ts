import { BankAccount } from "@/domain/entities";

export interface IGetAllBankAccounts {
  execute(userId: string): Promise<BankAccount[] | null>;
}
