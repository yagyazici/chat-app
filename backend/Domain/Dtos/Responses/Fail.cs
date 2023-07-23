using System.Text.Json.Serialization;

namespace Domain.Dtos.Responses;

public class Fail<TResponse> : Response
{
	[JsonPropertyName("Response")]
	public TResponse _Response { get; set; }
	public List<string> Errors { get; set; }
	public static Fail<TResponse> Response(TResponse response, List<string> errors) =>
		new Fail<TResponse> { IsSuccessful = false, Errors = errors, _Response = response };

	public static Fail<TResponse> Response(TResponse response) =>
		new Fail<TResponse> { IsSuccessful = false, _Response = response };
}