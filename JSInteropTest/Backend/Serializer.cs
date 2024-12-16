using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;

namespace JSInteropTest.Backend;

public static partial class Serializer
{
    [JsonSerializable(typeof(Record))]
    internal partial class Context : JsonSerializerContext
    {
        [System.Runtime.CompilerServices.ModuleInitializer]
        internal static void InjectTypeInfoResolver ()
        {
            options.TypeInfoResolverChain.Add(Default);
        }
    }

    private static readonly JsonSerializerOptions options = new(JsonSerializerDefaults.Web) {
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };

    public static string Serialize<T> (T json)
    {
        var info = (JsonTypeInfo<T>)options.GetTypeInfo(typeof(T));
        return JsonSerializer.Serialize(json, info);
    }

    public static T Deserialize<T> (string json)
    {
        var info = (JsonTypeInfo<T>)options.GetTypeInfo(typeof(T));
        return JsonSerializer.Deserialize(json, info)!;
    }
}
