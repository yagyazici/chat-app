using Domain.Entities.Base;

namespace Domain.Entities;
public class Log : Entity
{
	public string UserId { get; set; }
	public string Type { get; set; }
}