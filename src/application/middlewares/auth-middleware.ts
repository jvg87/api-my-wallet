import { UnauthorizedError } from "@/application/erros";
import { unauthorized } from "@/application/helpers";
import { IMiddleware, IRequest, IResponse } from "@/application/protocols";

export class AuthMiddleware implements IMiddleware {
  async handle(request: IRequest): Promise<IResponse> {
    const { authorization } = request.headers;

    if (!authorization) {
      return unauthorized(new UnauthorizedError());
    }
    return {
      statusCode: 1,
    };
  }
}
