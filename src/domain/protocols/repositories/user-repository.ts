export interface IUserRepository {
  checkByEmail(email: string): Promise<boolean>;
}
