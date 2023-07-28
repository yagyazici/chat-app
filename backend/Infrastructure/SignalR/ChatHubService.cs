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
		await _hubContext.Clients.User(receiverId).SendAsync("ReceiveNewChat", receiverId);
	}

	public async Task SendMessage(string receiverId, string message)
    {
        await _hubContext.Clients.User(receiverId).SendAsync("ReceiveNewMessage", message);
    }
}