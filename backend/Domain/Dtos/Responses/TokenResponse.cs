using System.Text.Json.Serialization;

namespace Domain.Dtos.Responses;

public class TokenResponse<TResponse> : Response
{
	public TResponse Data { get; set; }
	public AuthToken AuthToken { get; set; }
	public RefreshToken RefreshToken { get; set; }

	public static TokenResponse<TResponse> Success(TResponse response, AuthToken authToken, RefreshToken refreshToken) =>
		new()
        {
			IsSuccessful = true,
			Data = response,
			AuthToken = authToken,
			RefreshToken = refreshToken
		};
		
	public static TokenResponse<TResponse> Success(AuthToken authToken, RefreshToken refreshToken) =>
		new()
        {
			IsSuccessful = true,
			AuthToken = authToken,
			RefreshToken = refreshToken
		};
}