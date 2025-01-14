import { BankAccount, BankAccountParams } from "@/domain/entities";

export interface IBankAccountRepository {
  create(data: BankAccountParams): Promise<BankAccount | null>;
  findAllByUserId(userId: string): Promise<BankAccount[] | null>;
  findById(id: string): Promise<BankAccount | null>;
  update(
    bankAccountId: string,
    data: BankAccountParams
  ): Promise<BankAccount | null>;
  delete(bankAccountId: string, userId: string): Promise<void>;
}
