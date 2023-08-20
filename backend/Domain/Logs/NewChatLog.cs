using Domain.Logs.Base;

namespace Domain.Logs;
public class NewChatLog : Log
{
	public string UserId { get; set; }
	public string ChatId { get; set; }
}