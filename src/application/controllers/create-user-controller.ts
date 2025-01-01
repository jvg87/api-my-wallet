import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";
import { MissingParamsError } from "../erros";
import { badRequest } from "../helpers";

export class CreateUserController implements IController {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { name, email, password } = request.body;

    const missingParam = this.validateParams({ name, email, password });
    if (missingParam) return badRequest(new MissingParamsError(missingParam));

    return {
      statusCode: 1,
    };
  }

  private validateParams(params: {
    name?: string;
    email?: string;
    password?: string;
  }): string | null {
    if (!params.name) return "name";
    if (!params.email) return "email";
    if (!params.password) return "password";

    return null;
  }
}
