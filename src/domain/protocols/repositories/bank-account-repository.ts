import { BankAccount, BankAccountParams } from "@/domain/entities";

export interface IBankAccountRepository {
  create(data: BankAccountParams): Promise<BankAccount | null>;
}
