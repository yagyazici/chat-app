using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entities.Base;

public class Entity
{
	[BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    private DateTime? _createdDate;
    private DateTime? _modifiedDate;

    [JsonIgnore]
    public DateTime? CreateDate
    {
        get => _createdDate ?? DateTime.Now;
        set => _createdDate = value;
    }

    [JsonIgnore]
    public DateTime ModifiedDate
    {
        get => _modifiedDate ?? DateTime.Now;
        set => _modifiedDate = value;
    }
}