import {
  BankAccount,
  BankAccountParams,
  BankAccountType,
} from "@/domain/entities";
import { ICreateBankAccount } from "@/domain/protocols";

export class CreateBankAccountUseCase implements ICreateBankAccount {
  async execute(
    bankAccountParams: BankAccountParams
  ): Promise<BankAccount | null> {
    const { userId } = bankAccountParams;

    if (!userId) return null;

    return {
      color: "",
      initialBalance: 0,
      name: "",
      type: BankAccountType.CASH,
    };
  }
}
