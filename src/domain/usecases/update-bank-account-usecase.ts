import { BankAccount, BankAccountParams } from "@/domain/entities";
import { IBankAccountRepository, IUpdateBankAccount } from "@/domain/protocols";

export class UpdateBankAccountUseCase implements IUpdateBankAccount {
  constructor(private readonly bankAccountRepository: IBankAccountRepository) {}
  async execute(
    bankAccountId: string,
    bankAccountParams: BankAccountParams
  ): Promise<BankAccount | null> {
    const bankAccount =
      await this.bankAccountRepository.findById(bankAccountId);

    if (!bankAccount) return null;

    return {
      ...bankAccountParams,
      id: bankAccountId,
    };
  }
}
