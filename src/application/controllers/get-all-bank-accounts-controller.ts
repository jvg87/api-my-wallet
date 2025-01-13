import { UnauthorizedError } from "@/application/erros";
import { unauthorized } from "@/application/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";
import { IGetAllBankAccounts } from "@/domain/protocols";

export class GetAllBankAccountsController implements IController {
  constructor(private readonly getAllBankAccounts: IGetAllBankAccounts) {}
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { userId } = request;

    if (!userId) return unauthorized(new UnauthorizedError());

    await this.getAllBankAccounts.execute(userId);
    return {
      statusCode: 1,
    };
  }
}
