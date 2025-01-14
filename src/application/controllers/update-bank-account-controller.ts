import {
  InvalidParamsError,
  MissingParamsError,
  UnauthorizedError,
} from "@/application/erros";
import { badRequest, unauthorized } from "@/application/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";
import { BankAccountType } from "@/domain/entities";
import { IUpdateBankAccount } from "@/domain/protocols";

export class UpdateBankAccountController implements IController {
  constructor(private readonly updateBankAccount: IUpdateBankAccount) {}
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const userId = request.userId;

    if (!userId) return unauthorized(new UnauthorizedError());

    const bankAccountId = request.params?.bankAccountId;

    if (!bankAccountId)
      return badRequest(new MissingParamsError("bankAccountId"));

    const { name, initialBalance, color, type } = request.body;

    const missingParam = this.validateParams({
      name,
      initialBalance,
      color,
      type,
    });

    if (missingParam) return badRequest(new MissingParamsError(missingParam));

    if (
      type !== BankAccountType.CASH &&
      type !== BankAccountType.CHECKING &&
      type !== BankAccountType.INVESTMENT
    )
      return badRequest(new InvalidParamsError("type"));

    await this.updateBankAccount.execute(bankAccountId, {
      color,
      initialBalance,
      name,
      type,
      userId,
    });

    return {
      statusCode: 1,
    };
  }

  private validateParams(params: {
    name?: string;
    initialBalance?: number;
    color?: string;
    type?: BankAccountType;
  }): string | null {
    if (!params.name) return "name";
    if (!params.initialBalance) return "initialBalance";
    if (!params.color) return "color";
    if (!params.type) return "type";

    return null;
  }
}
