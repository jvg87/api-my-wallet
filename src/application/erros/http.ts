export class MissingParamsError extends Error {
  constructor(param: string) {
    super(`Missing param: ${param}`);
    this.name = "MissingParamsError";
  }
}

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("The email is already in use ");
    this.name = "EmailAlreadyExistsError";
  }
}

export class ServerError extends Error {
  constructor() {
    super(`Internal Server Error`);
    this.name = "ServerError";
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super(`Invalid Credentials`);
    this.name = "UnauthorizedError";
  }
}
