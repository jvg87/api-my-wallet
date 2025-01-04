import jwt from "jsonwebtoken";

import { IEncrypter } from "@/domain/protocols";

export class JwtAdapter implements IEncrypter {
  constructor(
    private readonly secreteKey: string,
    private readonly expiresDate: string
  ) {}
  async encrypt(id: string): Promise<string> {
    const accessToken = jwt.sign({ sub: id }, this.secreteKey, {
      expiresIn: this.expiresDate,
    });
    return accessToken;
  }
}
