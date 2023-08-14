using Microsoft.AspNetCore.SignalR;

namespace Infrastructure.SignalR;

public class ChatHub : Hub
{

	public ChatHub() { }

	public override Task OnConnectedAsync()
	{
		var userId = Context.GetHttpContext().Request.Query["user-id"].ToString();

		Groups.AddToGroupAsync(Context.ConnectionId, userId);
        Console.WriteLine($"{userId} connected.");

		return base.OnConnectedAsync();
	}

	public override Task OnDisconnectedAsync(Exception exception)
	{
		var userId = Context.GetHttpContext().Request.Query["user-id"].ToString();

		Groups.AddToGroupAsync(Context.ConnectionId, userId);
        Console.WriteLine($"{userId} disconnected.");

		return base.OnConnectedAsync();
	}
}