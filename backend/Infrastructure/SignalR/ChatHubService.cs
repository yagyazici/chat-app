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

	public async Task CreateChatMessage(string userId)
	{
		await _hubContext.Clients.User(userId).SendAsync("ReceiveNewChat", userId);
	}

	public async Task SendMessage(string userId, string message)
    {
        await _hubContext.Clients.User(userId).SendAsync("ReceiveNewMessage", userId, message);
    }
}