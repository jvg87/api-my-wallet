import { UnauthorizedError } from "@/application/erros";
import { ok, serverError, unauthorized } from "@/application/helpers";
import { IMiddleware, IRequest, IResponse } from "@/application/protocols";
import { IDecrypter } from "@/domain/protocols";

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly decrypter: IDecrypter) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { authorization } = request.headers;

      if (!authorization) {
        return unauthorized(new UnauthorizedError());
      }

      const [, token] = authorization.split(" ");

      const payload = await this.decrypter.decrypt(token);

      if (!payload) {
        return unauthorized(new UnauthorizedError());
      }

      const data = {
        userId: payload.sub,
      };

      return ok(data);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
