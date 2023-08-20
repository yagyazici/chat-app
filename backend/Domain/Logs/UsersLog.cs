using Domain.Logs.Base;

namespace Domain.Logs;
public class UsersLog : Log
{
	public string UserId { get; set; }
}