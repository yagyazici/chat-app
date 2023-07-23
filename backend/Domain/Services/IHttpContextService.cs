using Microsoft.AspNetCore.Http;

namespace Domain.Services;

public interface IHttpContextService
{
	string GetUserId();
	string GetUserRole();
	void SetCookie(string key, string value, CookieOptions options);
	string GetCookie(string key);
}