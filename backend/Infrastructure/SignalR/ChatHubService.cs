using System.Text.Json;
using Domain.Dtos;
using Domain.Entities;
using Domain.Services;
using Microsoft.AspNetCore.SignalR;

namespace Infrastructure.SignalR;

public class ChatHubService : IChatHubService
{
	private readonly IHubContext<ChatHub> _hubContext;

	public ChatHubService(IHubContext<ChatHub> hubContext)
	{
		_hubContext = hubContext;
	}

	public async Task CreateChatMessage(string id, Chat chat)
	{
		await _hubContext.Clients.Group(id).SendAsync("ReceiveNewChat", chat);
	}

	public async Task CreateGroupChatMessage(List<string> ids, Chat chat)
	{
		await _hubContext.Clients.Groups(ids).SendAsync("ReceiveNewChat", chat);
	}

	public async Task SendMessage(List<string> ids, SendMessageDto sendMessage)
	{
		await _hubContext.Clients.Groups(ids).SendAsync("ReceiveNewMessage", sendMessage);
	}
}