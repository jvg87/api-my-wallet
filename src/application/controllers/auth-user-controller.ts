import { MissingParamsError } from "@/application/erros";
import { badRequest } from "@/application/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";

export class AuthUserController implements IController {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { email, password } = request.body;

    if (!email) return badRequest(new MissingParamsError("email"));

    return {
      statusCode: 1,
    };
  }
}
