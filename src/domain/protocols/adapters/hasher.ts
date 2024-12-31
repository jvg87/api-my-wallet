export interface IHasher {
  hash(text: string, salt: number): Promise<string>;
}
