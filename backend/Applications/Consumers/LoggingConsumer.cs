using Domain.Logs.Base;
using Domain.Repository;
using MassTransit;

namespace Applications.Consumers;

public class LoggingConsumer : IConsumer<Log>
{
    private readonly ILogRepository<Log> _logRepository;

    public LoggingConsumer(ILogRepository<Log> logRepository)
    {
        _logRepository = logRepository;
    }

    public async Task Consume(ConsumeContext<Log> context)
    {
        await _logRepository.LogAsync(context.Message);
    }
}