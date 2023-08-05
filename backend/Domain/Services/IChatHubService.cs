using Domain.Entities;

namespace Domain.Services;
public interface IChatHubService
{
	Task CreateChatMessage(string userId);
	Task SendMessage(string userId, Message message);
}