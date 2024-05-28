using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace JSInteropTest.Backend;

public class Serializer () : JsonSerializer(new() {
    IgnoreReadOnlyFields = true,
    IgnoreReadOnlyProperties = true,
    WriteIndented = true,
    Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
    Converters = { new JsonStringEnumConverter() },
    TypeInfoResolverChain = { SettingsJsonContext.Default }
}), IConfigurationSerializer;

[JsonSerializable(typeof(JsonObject))]
[JsonSerializable(typeof(List<string>))]
public partial class JsonContext : JsonSerializerContext;
