using Domain.Dtos;
using Domain.Entities.Base;

namespace Domain.Entities;

public class Chat : Entity
{
	public string Name { get; set; }
	public string Type { get; set; }
	public List<UserDto> Participants { get; set; }
	public List<Message> Messages { get; set; }
	public DateTime LastUpdate { get; set; }
}