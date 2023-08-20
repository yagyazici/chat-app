using System.Linq.Expressions;
using MongoDB.Driver;
using Domain.Entities.Base;
using Domain.Repository;
using Microsoft.Extensions.Options;
using Domain.Settings;
using Domain.Logs.Base;

namespace Infrastructure.Repository;

public class LogRepository<TEntity> : ILogRepository<TEntity> where TEntity : Log
{
	private readonly IMongoCollection<Log> _collection;

	public LogRepository(IOptions<DatabaseSettings> databaseSettings)
	{
		var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

        _collection = mongoDatabase.GetCollection<Log>(typeof(Log).Name);
	}

    public async Task LogAsync(Log entity)
    {
        await _collection.InsertOneAsync(entity);
    }
}