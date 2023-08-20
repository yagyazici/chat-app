using Domain.Logs.Base;

namespace Domain.Logs;
public class MessageLog : Log
{
	public string ChatId { get; set; }
	public string UserId { get; set; }
	public string Text { get; set; }
}