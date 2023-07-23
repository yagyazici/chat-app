using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Domain.Services;

namespace Applications.Services;

public class HttpContextService : IHttpContextService
{
	private readonly IHttpContextAccessor _httpContextAccessor;

	public HttpContextService(IHttpContextAccessor httpContextAccessor) => _httpContextAccessor = httpContextAccessor;

	public string GetUserRole() => _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;
	
	public string GetCookie(string key) => _httpContextAccessor.HttpContext.Request.Cookies[key];

	public void SetCookie(string key, string value, CookieOptions options)
	{
		_httpContextAccessor.HttpContext.Response.Cookies.Append(key, value, options);
	}

	public string GetUserId() => _httpContextAccessor.HttpContext.User.FindFirstValue("Id") ?? string.Empty;
}