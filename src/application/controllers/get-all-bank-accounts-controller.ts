import { ServerError, UnauthorizedError } from "@/application/erros";
import { ok, serverError, unauthorized } from "@/application/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";
import { IGetAllBankAccounts } from "@/domain/protocols";

export class GetAllBankAccountsController implements IController {
  constructor(private readonly getAllBankAccounts: IGetAllBankAccounts) {}
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { userId } = request;

      if (!userId) return unauthorized(new UnauthorizedError());

      const bankAccounts = await this.getAllBankAccounts.execute(userId);

      return ok(bankAccounts);
    } catch (error) {
      return serverError(error as ServerError);
    }
  }
}
