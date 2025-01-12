import { UnauthorizedError } from "../erros";
import { unauthorized } from "../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";

export class GetUserController implements IController {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { userId } = request;

    if (!userId) return unauthorized(new UnauthorizedError());

    return {
      statusCode: 1,
    };
  }
}
