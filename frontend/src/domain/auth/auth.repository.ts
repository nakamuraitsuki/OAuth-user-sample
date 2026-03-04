import type { Result } from "../core/result";
import type { User } from "../user/user.model";
import type { AuthSession } from "./auth.model";

export interface IAuthRepository {
  login(email: string, password: string): Promise<Result<User, AuthError>>; // ID/PW 用
  loginOIDC(): Promise<Result<User, AuthError>>; // OIDC 用
  logout(): Promise<void>;
  fetchCurrentSession(): Promise<AuthSession>;
}

export type AuthError =
  | "INVALID_CREDENTIALS"
  | "NETWORK_ERROR"
  | "SERVER_ERROR"
  | "UNKNOWN_ERROR";