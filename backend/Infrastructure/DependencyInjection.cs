using Domain.Repository;
using Domain.Services;
using Infrastructure.Repository;
using Infrastructure.Services;
using Infrastructure.SignalR;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;
public static class DependencyInjection
{
	public static void AddInfrastructure(this IServiceCollection services)
	{
		services.AddSingleton<ICryptoService, CryptoService>();
		services.AddSingleton(typeof(IGenericRepository<>), typeof(GenericRepository<>));
		services.AddSingleton(typeof(ILogRepository<>), typeof(LogRepository<>));
	}

	public static void AddSignalRServices(this IServiceCollection services)
	{
		services.AddTransient<IChatHubService, ChatHubService>();
		services.AddSignalR().AddJsonProtocol(options =>
		{
			options.PayloadSerializerOptions.PropertyNamingPolicy = null;
		});
	}

	public static void MapHubs(this WebApplication webApplication)
	{
		webApplication.MapHub<ChatHub>("/chat-hub");
	}
}