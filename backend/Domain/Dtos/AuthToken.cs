namespace Domain.Dtos;

public class AuthToken
{
	public string Token { get; set; }
	public DateTime Expires { get; set; }
	public static AuthToken NewToken(string token, DateTime expires) =>
		new AuthToken { Token = token, Expires = expires };
}