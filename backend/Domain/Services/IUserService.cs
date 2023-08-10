using Domain.Dtos;

namespace Domain.Services;

public interface IUserService
{
	Task<List<UserDto>> Search(string username);
	Task<Response> Register(Authentication request);
	Task<Response> Login(Authentication request);
	Task<Response> RefreshToken(string refreshToken, string userId);
	Task<List<UserDto>> Users();
}