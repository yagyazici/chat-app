using Domain.Dtos;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiService.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class ChatController : ControllerBase
{
	private readonly IChatService _chatService;

	public ChatController(IChatService chatService) => _chatService = chatService;
	
	[HttpPost, Authorize]
	public async Task<Response> CreateNewChat(string userId) => await _chatService.CreateNewChat(userId);

	[HttpPost, Authorize]
	public async Task<Response> SendMessage(string chatId, string text) => await _chatService.SendMessage(chatId, text);

	[HttpPost, Authorize]
	public async Task<Response> GetUserChats() => await _chatService.GetUserChats();
}
