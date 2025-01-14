import { BankAccount } from "@/domain/entities";
import {
  IBankAccountRepository,
  IGetAllBankAccounts,
} from "@/domain/protocols";

export class GetAllBankAccountsUseCase implements IGetAllBankAccounts {
  constructor(private readonly bankAccountRepository: IBankAccountRepository) {}
  async execute(userId: string): Promise<BankAccount[] | null> {
    const bankAccounts =
      await this.bankAccountRepository.findAllByUserId(userId);

    return bankAccounts;
  }
}
