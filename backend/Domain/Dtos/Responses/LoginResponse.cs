using System.Text.Json.Serialization;
using Domain.Entities.Base;

namespace Domain.Dtos.Responses;

public class Login<TResponse> : Response
{
	[JsonPropertyName("Response")]
	public TResponse _Response { get; set; }
	public AuthToken AuthToken { get; set; }
	public RefreshToken RefreshToken { get; set; }

	public static Login<TResponse> Success(TResponse response, AuthToken authToken, RefreshToken refreshToken) =>
		new Login<TResponse>
		{
			IsSuccessful = true,
			_Response = response,
			AuthToken = authToken,
			RefreshToken = refreshToken
		};
}