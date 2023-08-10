using Domain.Entities;

namespace Domain.Dtos;

public class SendMessageDto
{
	public string ChatId { get; set; }
	public Message Message { get; set; }
}