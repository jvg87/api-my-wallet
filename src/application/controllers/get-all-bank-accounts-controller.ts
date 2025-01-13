import { UnauthorizedError } from "@/application/erros";
import { unauthorized } from "@/application/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";

export class GetAllBankAccountsController implements IController {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { userId } = request;

    if (!userId) return unauthorized(new UnauthorizedError());
    return {
      statusCode: 1,
    };
  }
}
