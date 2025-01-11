import { UnauthorizedError } from "@/application/erros";
import { unauthorized } from "@/application/helpers";
import { IMiddleware, IRequest, IResponse } from "@/application/protocols";
import { IDecrypter } from "@/domain/protocols";

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly decrypter: IDecrypter) {}

  async handle(request: IRequest): Promise<IResponse> {
    const { authorization } = request.headers;

    if (!authorization) {
      return unauthorized(new UnauthorizedError());
    }

    const [, token] = authorization.split(" ");

    await this.decrypter.decrypt(token);

    return {
      statusCode: 1,
    };
  }
}
