using Domain.Dtos;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiService.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{
	private readonly IUserService _userService;

	public UserController(IUserService userService)
	{
		_userService = userService;
	}

	[HttpPost]
	public async Task<Response> Register(Authentication request) => await _userService.Register(request);

	[HttpPost]
	public async Task<Response> RefreshToken(string refreshToken, string userId) =>
		await _userService.RefreshToken(refreshToken, userId);
		
	[HttpPost]
	public async Task<Response> Login(Authentication request) => await _userService.Login(request);


	[HttpGet, Authorize]
	public async Task<List<UserDto>> SearchUser(string username) => await _userService.SearchUser(username);
}
