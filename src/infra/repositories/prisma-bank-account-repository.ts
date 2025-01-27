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

  async findAllByUserId(userId: string): Promise<BankAccount[] | null> {
    const bankAccounts = await prisma.bankAccount.findMany({
      where: {
        userId,
      },
    });
    return bankAccounts.map((bankAccount) => ({
      ...bankAccount,
      type: bankAccount.type as BankAccountType,
    }));
  }

  async findById(id: string): Promise<BankAccount | null> {
    const bankAccount = await prisma.bankAccount.findUnique({
      where: {
        id,
      },
    });

    return {
      id: bankAccount?.id as string,
      color: bankAccount?.color as string,
      initialBalance: bankAccount?.initialBalance as number,
      name: bankAccount?.name as string,
      type: bankAccount?.type as BankAccountType,
    };
  }

  async update(
    bankAccountId: string,
    data: BankAccountParams
  ): Promise<BankAccount | null> {
    const bankAccount = await prisma.bankAccount.update({
      where: {
        id: bankAccountId,
        userId: data.userId,
      },
      data: {
        color: data.color,
        initialBalance: data.initialBalance,
        name: data.name,
        type: data.type,
      },
    });

    return {
      ...bankAccount,
      type: bankAccount.type as BankAccountType,
    };
  }

  async delete(bankAccountId: string, userId: string): Promise<void> {
    await prisma.bankAccount.delete({
      where: {
        id: bankAccountId,
        userId,
      },
    });
  }
}
