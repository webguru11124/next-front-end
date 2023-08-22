// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
export enum Role {
  user = "user",
  admin = "admin",
}
interface IUser extends DefaultUser {
  /**
   * Role of user
   */
  role?: Role;
  token: string;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session extends DefaultSession {
    user?: IUser;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
