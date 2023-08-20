using Applications.Producers;
using AutoMapper;
using Domain.Dtos;
using Domain.Dtos.Responses;
using Domain.Entities;
using Domain.Logs;
using Domain.Repository;
using Domain.Services;
using MongoDB.Driver;

namespace Infrastructure.Services;

public class UserService : IUserService
{
	private readonly IGenericRepository<User> _genericRepository;
	private readonly ITokenService _tokenService;
	private readonly ICryptoService _cryptoService;
	private readonly IMapper _mapper;
	private readonly LoggingProducer _loggingProducer;
	private readonly IHttpContextService _httpContext;

	public UserService(
		IGenericRepository<User> genericRepository,
		ITokenService tokenService,
		ICryptoService cryptoService,
		IMapper mapper,
		IHttpContextService httpContext,
		LoggingProducer loggingProducer)
	{
		_genericRepository = genericRepository;
		_tokenService = tokenService;
		_cryptoService = cryptoService;
		_mapper = mapper;
		_httpContext = httpContext;
		_loggingProducer = loggingProducer;
	}

	public async Task<List<UserDto>> Users()
	{
		var users = await _genericRepository.GetAllAsync();
		var userId = _httpContext.GetUserId();
		await _loggingProducer.Produce(new UsersLog() { UserId = userId });
		return _mapper.Map<List<UserDto>>(users);
	}

	public async Task<Response> Login(Authentication request)
	{
		var checkUser = await _genericRepository.AnyAsync(entity => entity.Username == request.Username);
		if (!checkUser)
		{
			await _loggingProducer.Produce(new LoginLog() { Username = request.Username, Password = request.Password, IsSuccsessful = false });
			return Fail<string>.Response("No user found");
		};
		var user = await _genericRepository.FirstOrDefault(entity => entity.Username == request.Username);
		if (!_cryptoService.VerifyPassword(request.Password, user.PasswordHash, user.PasswordSalt))
		{
			await _loggingProducer.Produce(new LoginLog() { Username = request.Username, Password = request.Password, IsSuccsessful = false });
			return Fail<string>.Response("Wrong password");
		}

		var authToken = _tokenService.CreateToken(user);
		var refreshToken = _tokenService.CreateRefreshToken();
		_tokenService.SetRefreshToken(refreshToken, user);

		await _loggingProducer.Produce(new LoginLog() { UserId = user.Id, Username = request.Username, Password = request.Password, IsSuccsessful = false });

		await _genericRepository.UpdateAsync(user);

		var mappedUser = _mapper.Map<UserDto>(user);

		return TokenResponse<UserDto>.Success(mappedUser, authToken, refreshToken);
	}

	public async Task<Response> RefreshToken(string refreshToken, string userId)
	{
		var user = await _genericRepository.GetByIdAsync(userId);

		if (!user.RefreshToken.Token.Equals(refreshToken))
		{
			return Fail<string>.Response("Invalid refresh token");
		}

		var authToken = _tokenService.CreateToken(user);
		var newRefreshToken = _tokenService.CreateRefreshToken();
		_tokenService.SetRefreshToken(newRefreshToken, user);

		await _loggingProducer.Produce(new RefreshTokenLog() { UserId = userId });

		await _genericRepository.UpdateAsync(user);
		return TokenResponse<string>.Success(authToken, newRefreshToken);
	}

	public async Task<Response> Register(Authentication request)
	{
		var checkUsername = await _genericRepository.AnyAsync(entity => entity.Username == request.Username);
		if (checkUsername)
		{
			return Fail<string>.Response("This username exists");
		}
		_cryptoService.HashPassword(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
		var newUser = new User
		{
			Username = request.Username,
			PasswordHash = passwordHash,
			PasswordSalt = passwordSalt
		};

		await _loggingProducer.Produce(new RegisterLog() { Username = request.Username, Password = request.Password });

		await _genericRepository.AddAsync(newUser);
		return Success<string>.Response("user created");
	}

	public async Task<List<UserDto>> Search(string username)
	{
		var userId = _httpContext.GetUserId();
		var builder = Builders<User>.Filter;
		var filter = builder.Regex("Username", "^" + username + ".*");

		await _loggingProducer.Produce(new SearchLog() { UserId = userId, Search = username });

		var users = await _genericRepository.Filter(filter);
		var mappedUsers = _mapper.Map<List<UserDto>>(users);
		return mappedUsers;
	}
}