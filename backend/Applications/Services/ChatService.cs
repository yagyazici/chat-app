using AutoMapper;
using Domain.Dtos;
using Domain.Dtos.Responses;
using Domain.Entities;
using Domain.Repository;
using Domain.Services;
using Infrastructure.SignalR;
using MongoDB.Bson;

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

	public async Task<Response> NewChat(string userId)
	{
		var currentUserId = _httpContext.GetUserId();
		var currentUser = await _userRepository.GetByIdAsync(currentUserId);

		var receiver = await _userRepository.GetByIdAsync(userId);

		var currentUserDto = _mapper.Map<UserDto>(currentUser);
		var receiverDto = _mapper.Map<UserDto>(receiver);

		var participants = new List<UserDto>() { currentUserDto, receiverDto };

		var newChat = new Chat
		{
			Id = ObjectId.GenerateNewId().ToString(),
			Participants = participants,
			Messages = new List<Message>()
		};

		await _chatRepository.AddAsync(newChat);
		await _chatHubService.CreateChatMessage(userId, newChat);

		return Success<Chat>.Response(newChat);
	}

	public async Task<Response> Message(string chatId, string text)
	{
		var currentUserId = _httpContext.GetUserId();

		var chat = await _chatRepository.GetByIdAsync(chatId);

		chat.LastUpdate = DateTime.Now;

		var newMessage = new Message
		{
			UserId = currentUserId,
			Text = text
		};

		newMessage.SeenList.Add(currentUserId);

		chat.Messages.Add(newMessage);
		var participants = chat.Participants.Select(participants => participants.Id).ToList();
		var sendMessage = new SendMessageDto
		{
			ChatId = chatId,
			Message = newMessage,
		};

		await _chatRepository.UpdateAsync(chat);
		await _chatHubService.SendMessage(participants, sendMessage);

		return Success<List<Message>>.Response(chat.Messages);
	}

	public async Task<Response> Chats()
	{
		var currentUserId = _httpContext.GetUserId();

		var chats = await _chatRepository.FilterAsync(chat =>
			chat.Participants.Where(user => user.Id == currentUserId).Any()
		);

		chats = chats.OrderByDescending(chat => chat.LastUpdate).ToList();

		return Success<List<Chat>>.Response(chats);
	}

	public async Task<Response> Chat(string chatId)
	{
		var userId = _httpContext.GetUserId();

		var chat = await _chatRepository.GetByIdAsync(chatId);
		var updatedMessages = chat.Messages.Select(message =>
		{
			if (!message.SeenList.Contains(userId))
			{
				message.SeenList.Add(userId);
			}
			return message;
		}).ToList();

		chat.Messages = updatedMessages;

		await _chatRepository.UpdateAsync(chat);

		return Success<Chat>.Response(chat);
	}
}