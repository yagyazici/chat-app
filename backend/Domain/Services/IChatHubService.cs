using Domain.Dtos;
using Domain.Entities;

namespace Domain.Services;
public interface IChatHubService
{
	Task CreateChatMessage(string receiverId, Chat chat);
	Task SendMessage(List<string> ids, SendMessageDto sendMessage);
}