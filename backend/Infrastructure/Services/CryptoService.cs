using System.Security.Cryptography;
using System.Text;
using Domain.Services;

namespace Infrastructure.Services;

public class CryptoService : ICryptoService
{
	public void HashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
	{
		using (HMACSHA512 hmac = new())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }
	}

	public bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
	{
		using (var hmac = new HMACSHA512(passwordSalt))
        {
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }
	}
}