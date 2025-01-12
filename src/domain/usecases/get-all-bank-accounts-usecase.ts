import { BankAccount, BankAccountType } from "@/domain/entities";
import {
  IBankAccountRepository,
  IGetAllBankAccounts,
} from "@/domain/protocols";

export class GetAllBankAccountsUseCase implements IGetAllBankAccounts {
  constructor(private readonly bankAccountRepository: IBankAccountRepository) {}
  async execute(userId: string): Promise<BankAccount[] | null> {
    await this.bankAccountRepository.findAllByUserId(userId);

    return [
      {
        id: "string",
        name: "string",
        initialBalance: 0,
        color: "string",
        type: BankAccountType.CHECKING,
      },
    ];
  }
}
