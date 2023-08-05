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

	public async Task CreateChatMessage(string receiverId)
	{
		await _hubContext.Clients.Group(receiverId).SendAsync("ReceiveNewChat", receiverId);
	}

	public async Task SendMessage(string receiverId, Message message)
    {
        await _hubContext.Clients.Group(receiverId).SendAsync("ReceiveNewMessage", message);
    }
}