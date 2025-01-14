import { IDeleteBankAccount } from "@/domain/protocols";

export class DeleteBankAccountUseCase implements IDeleteBankAccount {
  async execute(bankAccountId: string, userId: string): Promise<void> {
    return;
  }
}
