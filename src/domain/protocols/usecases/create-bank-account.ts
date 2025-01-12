import { BankAccount, BankAccountParams } from "@/domain/entities";

export interface ICreateBankAccount {
  execute(bankAccountParams: BankAccountParams): Promise<BankAccount | null>;
}
