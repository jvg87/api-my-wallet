import { IHasher } from "@/domain/protocols";

import bcrypt from "bcrypt";

export class BcryptAdapter implements IHasher {
  async hash(text: string, salt: number): Promise<string> {
    return bcrypt.hash(text, salt);
  }
}
