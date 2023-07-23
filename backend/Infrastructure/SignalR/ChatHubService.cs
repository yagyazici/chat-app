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
		await _hubContext.Clients.Client(userId).SendAsync("ReceiveNewChat", userId);
	}

	public async Task SendMessage(string userId, string message)
    {
        // Send the message to the specified user using their connection ID
        await _hubContext.Clients.Client(userId).SendAsync("ReceiveNewMessage", userId, message);
    }
}