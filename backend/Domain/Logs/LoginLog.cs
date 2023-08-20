using Domain.Logs.Base;

namespace Domain.Logs;
public class LoginLog : Log
{
	public string UserId { get; set; }
	public string Username { get; set; }
	public string Password { get; set; }
	public bool IsSuccsessful { get; set; }
}