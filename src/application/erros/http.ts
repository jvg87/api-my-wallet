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
