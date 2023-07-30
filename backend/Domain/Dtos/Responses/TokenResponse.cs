using System.Text.Json.Serialization;

namespace Domain.Dtos.Responses;

public class TokenResponse<TResponse> : Response
{
	[JsonPropertyName("response")]
	public TResponse _Response { get; set; }
	public AuthToken AuthToken { get; set; }
	public RefreshToken RefreshToken { get; set; }

	public static TokenResponse<TResponse> Success(TResponse response, AuthToken authToken, RefreshToken refreshToken) =>
		new TokenResponse<TResponse>
		{
			IsSuccessful = true,
			_Response = response,
			AuthToken = authToken,
			RefreshToken = refreshToken
		};
		
	public static TokenResponse<TResponse> Success(AuthToken authToken, RefreshToken refreshToken) =>
		new TokenResponse<TResponse>
		{
			IsSuccessful = true,
			AuthToken = authToken,
			RefreshToken = refreshToken
		};
}