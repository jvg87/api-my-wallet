import { IHashComparer, IHasher } from "@/domain/protocols";

import bcrypt from "bcrypt";

export class BcryptAdapter implements IHasher, IHashComparer {
  async hash(text: string, salt: number): Promise<string> {
    return bcrypt.hash(text, salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}
