using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace Infrastructure.SignalR;

public class ChatHub : Hub
{
	private readonly Logger<ChatHub> _logger;

	public ChatHub(Logger<ChatHub> logger)
	{
		_logger = logger;
	}

	public override Task OnConnectedAsync()
	{
		var httpContext = Context.GetHttpContext();
		var userId = httpContext.Request.Headers["User"];

		Groups.AddToGroupAsync(Context.ConnectionId, userId);
		_logger.LogInformation($"{userId} connected.");

		return base.OnConnectedAsync();
	}
}