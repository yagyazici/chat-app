using Domain.Logs.Base;
using MassTransit;

namespace Applications.Producers;

public class LoggingProducer
{
	private readonly ISendEndpointProvider _sendEndpointProvider;

	public LoggingProducer(ISendEndpointProvider sendEndpointProvider)
	{
		_sendEndpointProvider = sendEndpointProvider;
	}

	public async Task Produce(Log log)
	{
		var host = "rabbitmq://localhost/";
		var endpoint = await _sendEndpointProvider.GetSendEndpoint(new Uri($"{host}log-queue"));
		await endpoint.Send(log);
	}
}