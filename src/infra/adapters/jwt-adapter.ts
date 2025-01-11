import jwt from "jsonwebtoken";

import { IDecrypter, IEncrypter, IPayload } from "@/domain/protocols";

export class JwtAdapter implements IEncrypter, IDecrypter {
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

  async decrypt(token: string): Promise<IPayload | null> {
    const payload = jwt.verify(token, this.secreteKey) as IPayload;
    if (!payload) return null;
    return payload;
  }
}
