import { UnauthorizedError } from "@/application/erros";
import { unauthorized } from "@/application/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";

export class DeleteBankAccountController implements IController {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const userId = request.userId;

    if (!userId) return unauthorized(new UnauthorizedError());

    return { statusCode: 1 };
  }
}
