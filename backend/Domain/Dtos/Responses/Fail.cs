using System.Text.Json.Serialization;

namespace Domain.Dtos.Responses;

public class Fail<TResponse> : Response
{
	public TResponse Data { get; set; }
	public static Fail<TResponse> Response(TResponse response) =>
		new() { IsSuccessful = false, Data = response };
}