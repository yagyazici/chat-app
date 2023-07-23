using AutoMapper;
using Domain.Dtos;
using Domain.Dtos.Responses;
using Domain.Entities;
using Domain.Repository;
using Domain.Services;

namespace Applications.Services;

public class ChatService : IChatService
{
	private readonly IGenericRepository<Chat> _chatRepository;
	private readonly IGenericRepository<User> _userRepository;
	private readonly IHttpContextService _httpContext;
	private readonly IChatHubService _chatHubService;
	private readonly IMapper _mapper;

	public ChatService(
		IHttpContextService httpContext,
		IGenericRepository<Chat> chatRepository,
		IGenericRepository<User> userRepository,
		IMapper mapper,
		IChatHubService chatHubService)
	{
		_httpContext = httpContext;
		_chatRepository = chatRepository;
		_userRepository = userRepository;
		_mapper = mapper;
		_chatHubService = chatHubService;
	}

	public async Task<Response> CreateNewChat(string userId)
	{
		var currentUserId = _httpContext.GetUserId();
		var currentUser = await _userRepository.GetByIdAsync(currentUserId);

		var otherUser = await _userRepository.GetByIdAsync(userId);

		var currentUserDto = _mapper.Map<UserDto>(currentUser);
		var otherUserDto = _mapper.Map<UserDto>(otherUser);

		var participants = new List<UserDto>() { currentUserDto, otherUserDto };

		var newChat = new Chat
		{
			Participants = participants,
			Messages = new List<Message>()
		};

		await _chatHubService.CreateChatMessage(userId);
		return Success<string>.Response("new chat created");
	}
}