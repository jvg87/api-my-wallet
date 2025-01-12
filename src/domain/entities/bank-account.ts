export enum BankAccountType {
  CHECKING = "CHECKING",
  INVESTMENT = "INVESTMENT",
  CASH = "CASH",
}

export type BankAccount = {
  name: string;
  initialBalance: number;
  color: string;
  type: BankAccountType;
};

export type BankAccountParams = {
  userId: string;
  name: string;
  initialBalance: number;
  color: string;
  type: BankAccountType;
};
