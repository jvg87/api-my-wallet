export interface IDeleteBankAccount {
  execute(bankAccountId: string, userId: string): Promise<void>;
}
