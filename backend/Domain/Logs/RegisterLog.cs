using Domain.Logs.Base;

namespace Domain.Logs;
public class RegisterLog : Log
{
	public string Username { get; set; }
	public string Password { get; set; }
}