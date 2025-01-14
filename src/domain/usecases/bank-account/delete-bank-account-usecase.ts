import { IBankAccountRepository, IDeleteBankAccount } from "@/domain/protocols";

export class DeleteBankAccountUseCase implements IDeleteBankAccount {
  constructor(private readonly bankAccountRepository: IBankAccountRepository) {}
  async execute(bankAccountId: string, userId: string): Promise<void> {
    const bankAccount =
      await this.bankAccountRepository.findById(bankAccountId);
    return;
  }
}
