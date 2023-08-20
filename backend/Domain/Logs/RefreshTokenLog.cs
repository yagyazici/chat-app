using Domain.Logs.Base;

namespace Domain.Logs;
public class RefreshTokenLog : Log
{
	public string UserId { get; set; }
}