using Domain.Entities;
using Domain.Repository;
using MassTransit;

namespace Applications.Consumers;

public class LoggingConsumer : IConsumer<Log>
{
    private readonly IGenericRepository<Log> _logRepository;

    public LoggingConsumer(IGenericRepository<Log> logRepository)
    {
        _logRepository = logRepository;
    }

    public async Task Consume(ConsumeContext<Log> context)
    {
        await _logRepository.AddAsync(context.Message);
    }
}