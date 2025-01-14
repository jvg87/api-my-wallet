import {
  EmailAlreadyExistsError,
  MissingParamsError,
  ServerError,
} from "@/application/erros";
import {
  badRequest,
  conflict,
  created,
  serverError,
} from "@/application/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";
import { ICreateUser } from "@/domain/protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserUseCase: ICreateUser) {}
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { name, email, password } = request.body;

      const missingParam = this.validateParams({ name, email, password });

      if (missingParam) return badRequest(new MissingParamsError(missingParam));

      const newUser = await this.createUserUseCase.execute({
        email,
        name,
        password,
      });

      if (!newUser) return conflict(new EmailAlreadyExistsError());

      return created();
    } catch (error) {
      return serverError(error as ServerError);
    }
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
