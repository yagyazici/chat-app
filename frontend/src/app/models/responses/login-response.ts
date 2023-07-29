import { AuthToken } from "../auth/auth-token";
import { RefreshToken } from "../auth/refresh-token";
import { Response } from "../base/response";

export class LoginResponse<TEntity> extends Response {
	response: TEntity;
	authToken: AuthToken;
	refrehToken: RefreshToken;
}
