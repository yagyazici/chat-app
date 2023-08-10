import { AuthToken } from "../auth/auth-token";
import { RefreshToken } from "../auth/refresh-token";
import { Response } from "../base/response";

export class TokenResponse<TEntity> extends Response {
	Response: TEntity;
	AuthToken: AuthToken;
	RefreshToken: RefreshToken;
}
