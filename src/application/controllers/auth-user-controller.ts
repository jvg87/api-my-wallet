import {
  MissingParamsError,
  ServerError,
  UnauthorizedError,
} from "@/application/erros";
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from "@/application/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";
import { IAuthUser } from "@/domain/protocols";

export class AuthUserController implements IController {
  constructor(private readonly authUser: IAuthUser) {}
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = request.body;

      if (!email) return badRequest(new MissingParamsError("email"));

      if (!password) return badRequest(new MissingParamsError("password"));

      const authUser = await this.authUser.execute({ email, password });

      if (!authUser) return unauthorized(new UnauthorizedError());

      return ok(authUser);
    } catch (error) {
      return serverError(error as ServerError);
    }
  }
}
