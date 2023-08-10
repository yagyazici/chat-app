namespace Domain.Entities;

public class Message
{
	public string UserId { get; set; }
	public string Text { get; set; }
	public DateTime SentTime { get; set; } = DateTime.Now;
	public List<string> SeenList { get; set; } = new List<string>();
}