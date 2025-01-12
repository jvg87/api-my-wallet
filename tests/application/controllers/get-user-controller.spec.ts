import { beforeEach, describe, expect, it } from "@jest/globals";

import { GetUserController } from "@/application/controllers";
import { UnauthorizedError } from "@/application/erros";
import { unauthorized } from "@/application/helpers";

describe("GetUser Controller", () => {
  let sut: GetUserController;

  beforeEach(() => {
    sut = new GetUserController();
  });

  it("Should return 401 if no user id is provided", async () => {
    const httpResponse = await sut.handle({
      body: {},
      userId: "",
    });
    expect(httpResponse).toEqual(unauthorized(new UnauthorizedError()));
  });
});
