using Domain.Dtos;

namespace Domain.Services;

public interface IUserService
{
	Task<List<UserDto>> SearchUser(string username);
	Task<Response> Register(RegisterDto request);
	Task<Response> Login(LoginDto request);
	Task<Response> RefreshToken();
}