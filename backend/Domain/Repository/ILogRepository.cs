using Domain.Logs.Base;

namespace Domain.Repository;

public interface ILogRepository<TEntity> where TEntity : Log
{
	Task LogAsync(Log entity);
}