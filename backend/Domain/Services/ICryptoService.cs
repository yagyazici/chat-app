namespace Domain.Services;

public interface ICryptoService
{
	void HashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt);
	bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt);
}