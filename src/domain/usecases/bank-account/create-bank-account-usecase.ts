import { BankAccount, BankAccountParams } from "@/domain/entities";
import { IBankAccountRepository, ICreateBankAccount } from "@/domain/protocols";

export class CreateBankAccountUseCase implements ICreateBankAccount {
  constructor(private readonly bankAccountRepository: IBankAccountRepository) {}
  async execute(
    bankAccountParams: BankAccountParams
  ): Promise<BankAccount | null> {
    const { userId, color, initialBalance, name, type } = bankAccountParams;

    if (!userId) return null;

    const bankAccount = await this.bankAccountRepository.create({
      userId,
      color,
      initialBalance,
      name,
      type,
    });

    return bankAccount;
  }
}
