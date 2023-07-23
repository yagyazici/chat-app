namespace Domain.Entities;

public class Message
{
	public User Sender { get; set; }
	public string Text { get; set; }
}