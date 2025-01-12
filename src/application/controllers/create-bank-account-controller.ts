import { UnauthorizedError } from "@/application/erros";
import { unauthorized } from "@/application/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";
import { ICreateBankAccount } from "@/domain/protocols";

export class CreateBankAccountController implements IController {
  constructor(private readonly createBankAccount: ICreateBankAccount) {}
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { name, initialBalance, color, type } = request.body;
    const userId = request.userId;

    if (!userId) return unauthorized(new UnauthorizedError());
    return {
      statusCode: 1,
    };
  }
}
