using Domain.Dtos;
using Domain.Entities;

namespace Domain.Services;

public interface ITokenService
{
	AuthToken CreateToken(User user);
	RefreshToken CreateRefreshToken();
	void SetRefreshToken(RefreshToken refreshToken, User user);
}