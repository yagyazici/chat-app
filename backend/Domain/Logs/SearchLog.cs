using Domain.Logs.Base;

namespace Domain.Logs;
public class SearchLog : Log
{
	public string UserId { get; set; }
	public string Search { get; set; }
}