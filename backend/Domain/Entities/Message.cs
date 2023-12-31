using Domain.Entities.Base;

namespace Domain.Entities;

public class Message : Entity
{
	public string UserId { get; set; }
	public string Username { get; set; }
	public string Text { get; set; }
	public List<string> SeenList { get; set; } = new();
	public DateTime MessageDate { get; set; } = DateTime.Now;
}