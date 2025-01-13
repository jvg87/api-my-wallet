import { BankAccount, BankAccountParams } from "@/domain/entities";
import { IBankAccountRepository, IUpdateBankAccount } from "@/domain/protocols";

export class UpdateBankAccountUseCase implements IUpdateBankAccount {
  constructor(private readonly bankAccountRepository: IBankAccountRepository) {}
  async execute(
    bankAccountId: string,
    bankAccountParams: BankAccountParams
  ): Promise<BankAccount | null> {
    await this.bankAccountRepository.findById(bankAccountId);

    return {
      ...bankAccountParams,
      id: bankAccountId,
    };
  }
}
