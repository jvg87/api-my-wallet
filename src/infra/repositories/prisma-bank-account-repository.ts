import {
  BankAccount,
  BankAccountParams,
  BankAccountType,
} from "@/domain/entities";
import { IBankAccountRepository } from "@/domain/protocols";
import { prisma } from "@/utils";

export class PrismaBankAccountRepository implements IBankAccountRepository {
  async create(data: BankAccountParams): Promise<BankAccount | null> {
    const bankAccount = await prisma.bankAccount.create({
      data: {
        color: data.color,
        initialBalance: data.initialBalance,
        name: data.name,
        type: data.type,
        userId: data.userId,
      },
    });
    return {
      ...bankAccount,
      type: bankAccount.type as BankAccountType,
    };
  }
}
