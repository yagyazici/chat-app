using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Logs.Base;

public class Log
{
	[BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    private DateTime? _transactionDate;
    public DateTime TransactionDate
    {
        get => _transactionDate ?? DateTime.Now;
        set => _transactionDate = value;
    }
}