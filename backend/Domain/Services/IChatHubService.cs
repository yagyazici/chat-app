namespace Domain.Services;
public interface IChatHubService
{
	Task CreateChatMessage(string userId);
	Task SendMessage(string userId, string message);
}