using Domain.Dtos;

namespace Domain.Services;

public interface IChatService
{
	Task<Response> Chat(string chatId);
	Task<Response> Chats();
	Task<Response> Message(string chatId, string text);
	Task<Response> NewChat(string userId);
}