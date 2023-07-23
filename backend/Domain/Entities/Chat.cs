using Domain.Dtos;
using Domain.Entities.Base;

namespace Domain.Entities;

public class Chat : Entity
{
	public List<UserDto> Participants { get; set; }
	public List<Message> Messages { get; set; }
}