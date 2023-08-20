using Domain.Logs.Base;

namespace Domain.Logs;
public class ChatLog : Log
{
	public string UserId { get; set; }
	public string ChatId { get; set; }
}