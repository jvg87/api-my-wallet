import { UnauthorizedError } from "@/application/erros";
import { ok, unauthorized } from "@/application/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";
import { IGetUser } from "@/domain/protocols";

export class GetUserController implements IController {
  constructor(private readonly getUser: IGetUser) {}
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { userId } = request;

    if (!userId) return unauthorized(new UnauthorizedError());

    const user = await this.getUser.execute(userId);

    return ok(user);
  }
}
