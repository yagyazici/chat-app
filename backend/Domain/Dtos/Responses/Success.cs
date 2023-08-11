using System.Text.Json.Serialization;

namespace Domain.Dtos.Responses;

public class Success<TResponse> : Response
{
	public TResponse Data { get; set; }

	public static Success<TResponse> Response(TResponse response) => new() { IsSuccessful = true, Data = response };
}