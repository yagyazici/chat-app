using System.Text;
using Applications.Services;
using Domain.Services;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

namespace Applications;

public static class DependencyInjection
{
	public static void AddApplications(this IServiceCollection services)
	{
		services.AddHttpContextAccessor();
		services.AddScoped<IHttpContextService, HttpContextService>();
		services.AddScoped<ITokenService, TokenService>();
	}

	public static void AddAuthentications(this IServiceCollection services, WebApplicationBuilder builder)
	{
		services.AddScoped<IUserService, UserService>();
		services.AddHttpContextAccessor();
		services.AddSwaggerGen(options =>
		{
			options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
			{
				In = ParameterLocation.Header,
				Name = "Authorization",
				Type = SecuritySchemeType.ApiKey
			});
			options.OperationFilter<SecurityRequirementsOperationFilter>();
		});
		var key = builder.Configuration.GetSection("TokenSettings:Token").Value;
		services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
		{
			options.TokenValidationParameters = new TokenValidationParameters
			{
				ValidateIssuerSigningKey = true,
				ValidateAudience = false,
				ValidateIssuer = false,
				IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
			};
		});
	}
}