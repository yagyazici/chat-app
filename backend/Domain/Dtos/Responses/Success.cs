using System.Text.Json.Serialization;

namespace Domain.Dtos.Responses;

public class Success<TResponse> : Response
{
	[JsonPropertyName("Response")]
	public TResponse _Response { get; set; }
	
	public static Success<TResponse> Response(TResponse response) =>
		new Success<TResponse> { IsSuccessful = true, _Response = response };
}