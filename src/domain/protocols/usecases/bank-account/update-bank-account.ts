import { BankAccount, BankAccountParams } from "@/domain/entities";

export interface IUpdateBankAccount {
  execute(
    bankAccountId: string,
    bankAccountParams: BankAccountParams
  ): Promise<BankAccount | null>;
}
