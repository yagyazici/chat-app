using Domain.Entities;

namespace Domain.Dtos;

public class SendMessageDto
{
	public string chatId { get; set; }
	public Message message { get; set; }
}