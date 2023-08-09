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

	public async Task CreateChatMessage(string receiverId, Chat chat)
	{
		await _hubContext.Clients.Group(receiverId).SendAsync("ReceiveNewChat", chat);
	}

	public async Task SendMessage(List<string> ids, SendMessageDto sendMessage)
    {
        await _hubContext.Clients.Groups(ids).SendAsync("ReceiveNewMessage", sendMessage);
    }
}