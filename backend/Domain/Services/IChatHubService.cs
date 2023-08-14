using Domain.Dtos;
using Domain.Entities;

namespace Domain.Services;
public interface IChatHubService
{
	Task CreateChatMessage(string id, Chat chat);
	Task CreateGroupChatMessage(List<string> ids, Chat chat);
	Task SendMessage(List<string> ids, SendMessageDto sendMessage);
}