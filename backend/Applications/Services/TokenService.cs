using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Domain.Dtos;
using Domain.Entities;
using Domain.Services;
using Domain.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services;

public class TokenService : ITokenService
{
	private readonly IHttpContextService _httpContextService;
	private readonly string _token;

	public TokenService(IOptions<TokenSettings> tokenSettings, IHttpContextService httpContextService)
	{
		_token = tokenSettings.Value.Token;
		_httpContextService = httpContextService;
	}

	public RefreshToken CreateRefreshToken()
	{
		return new RefreshToken
		{
			Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
			Expires = DateTime.Now.AddDays(7)
		};
	}

	public void SetRefreshToken(RefreshToken refreshToken, User user)
	{
		var cookieOptions = new CookieOptions
		{
			HttpOnly = true,
			Expires = refreshToken.Expires,
			Domain = "localhost"
		};
		_httpContextService.SetCookie("refreshToken", refreshToken.Token, cookieOptions);
		user.RefreshToken = refreshToken;
	}

	public string GetRefreshToken() => _httpContextService.GetCookie("refreshToken");

	public AuthToken CreateToken(User user)
	{
		var claims = new List<Claim>{
			new Claim("Id", user.Id),
		};

		var key = _token;

		var credentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)), SecurityAlgorithms.HmacSha256Signature);

		var expires = DateTime.Now.AddHours(1);

		var token = new JwtSecurityToken(
			claims: claims,
			expires: expires,
			signingCredentials: credentials
		);

		var jwt = new JwtSecurityTokenHandler().WriteToken(token);
		return AuthToken.NewToken(jwt, expires);
	}
}