using Domain.Dtos;

namespace Domain.Services;

public interface IChatService
{
	Task<Response> CreateNewChat(string userId);
}