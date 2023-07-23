using Domain.Dtos;
using Domain.Entities.Base;

namespace Domain.Entities;

public class User : Entity
{
	public string Username { get; set; }
	public byte[] PasswordHash { get; set; }
	public byte[] PasswordSalt { get; set; }
	public RefreshToken RefreshToken { get; set; }
}