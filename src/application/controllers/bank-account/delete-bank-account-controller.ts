import {
  MissingParamsError,
  NotFoundError,
  UnauthorizedError,
} from "@/application/erros";
import { badRequest, notFound, unauthorized } from "@/application/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/application/protocols";
import { IDeleteBankAccount } from "@/domain/protocols";

export class DeleteBankAccountController implements IController {
  constructor(private readonly deleteBankAccount: IDeleteBankAccount) {}
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const userId = request.userId;

    if (!userId) return unauthorized(new UnauthorizedError());

    const bankAccountId = request.params?.bankAccountId;

    if (!bankAccountId)
      return badRequest(new MissingParamsError("bankAccountId"));

    const response = await this.deleteBankAccount.execute(
      bankAccountId,
      userId
    );

    if (!response) return notFound(new NotFoundError());

    return { statusCode: 1 };
  }
}