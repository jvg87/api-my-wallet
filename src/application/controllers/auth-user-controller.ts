import { MissingParamsError } from "@/application/erros";
import { badRequest } from "@/application/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";
import { IAuthUser } from "@/domain/protocols";

export class AuthUserController implements IController {
  constructor(private readonly authUser: IAuthUser) {}
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { email, password } = request.body;

    if (!email) return badRequest(new MissingParamsError("email"));

    if (!password) return badRequest(new MissingParamsError("password"));

    await this.authUser.execute({ email, password });

    return {
      statusCode: 1,
    };
  }
}
