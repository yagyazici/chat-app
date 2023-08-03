using Domain.Dtos;

namespace Domain.Services;

public interface IChatService
{
	Task<Response> GetChat(string chatId);
	Task<Response> GetUserChats();
	Task<Response> SendMessage(string chatId, string text);
	Task<Response> CreateNewChat(string userId);
}