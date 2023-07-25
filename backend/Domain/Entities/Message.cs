using Domain.Dtos;

namespace Domain.Entities;

public class Message
{
	public string SenderId { get; set; }
	public string Text { get; set; }
}