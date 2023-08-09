using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace Infrastructure.SignalR;

public class ChatHub : Hub
{

	public ChatHub() { }

	public override Task OnConnectedAsync()
	{
		var userId = Context.GetHttpContext().Request.Query["user-id"].ToString();

		Groups.AddToGroupAsync(Context.ConnectionId, userId);
		System.Console.WriteLine($"{userId} connected.");

		return base.OnConnectedAsync();
	}

	public override Task OnDisconnectedAsync(Exception exception)
	{
		var userId = Context.GetHttpContext().Request.Query["user-id"].ToString();

		Groups.AddToGroupAsync(Context.ConnectionId, userId);
		System.Console.WriteLine($"{userId} disconnected.");

		return base.OnConnectedAsync();
	}
}