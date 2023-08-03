using Domain.Dtos;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiService.Controllers;

[ApiController]
[Authorize]
[Route("[controller]/[action]")]
public class ChatController : ControllerBase
{
	private readonly IChatService _chatService;

	public ChatController(IChatService chatService) => _chatService = chatService;
	
	[HttpPost]
	public async Task<Response> NewChat(string userId) => await _chatService.NewChat(userId);

	[HttpPost]
	public async Task<Response> Message(string chatId, string text) => await _chatService.Message(chatId, text);

	[HttpGet]
	public async Task<Response> Chats() => await _chatService.Chats();

	[HttpGet]
	public async Task<Response> Chat(string chatId) => await _chatService.Chat(chatId);
}
