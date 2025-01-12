import {
  InvalidParamsError,
  MissingParamsError,
  ServerError,
  UnauthorizedError,
} from "@/application/erros";
import {
  badRequest,
  created,
  serverError,
  unauthorized,
} from "@/application/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";
import { BankAccountType } from "@/domain/entities";
import { ICreateBankAccount } from "@/domain/protocols";

export class CreateBankAccountController implements IController {
  constructor(private readonly createBankAccount: ICreateBankAccount) {}
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const userId = request.userId;

      if (!userId) return unauthorized(new UnauthorizedError());

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

      await this.createBankAccount.execute({
        userId,
        color,
        initialBalance,
        name,
        type,
      });

      return created();
    } catch (error) {
      return serverError(error as ServerError);
    }
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
