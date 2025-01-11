export type IPayload = {
  sub: string;
};
export interface IDecrypter {
  decrypt(token: string): Promise<IPayload | null>;
}
