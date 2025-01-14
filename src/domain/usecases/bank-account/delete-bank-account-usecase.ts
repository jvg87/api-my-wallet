import { IBankAccountRepository, IDeleteBankAccount } from "@/domain/protocols";

export class DeleteBankAccountUseCase implements IDeleteBankAccount {
  constructor(private readonly bankAccountRepository: IBankAccountRepository) {}
  async execute(bankAccountId: string, userId: string): Promise<void | null> {
    const bankAccount =
      await this.bankAccountRepository.findById(bankAccountId);

    if (!bankAccount) return null;

    await this.bankAccountRepository.delete(bankAccountId, userId);

    return;
  }
}
