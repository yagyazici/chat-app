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
	private readonly string _token;

    public TokenService(IOptions<TokenSettings> tokenSettings) => _token = tokenSettings.Value.Token;

    public RefreshToken CreateRefreshToken() => new()
    {
		Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
	};

	public void SetRefreshToken(RefreshToken refreshToken, User user) => user.RefreshToken = refreshToken;

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