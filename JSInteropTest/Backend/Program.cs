using System.Runtime.InteropServices.JavaScript;
using System.Text;

Console.WriteLine("Booted main in C#.");

public static partial class Program
{
    [JSImport("log", "moduleIdCanBeAnything")]
    private static partial void Log (string msg);

    [JSImport("OptionalSpace.getNumbers", "moduleIdCanBeAnything")]
    private static partial int[] GetNumbers ();

    [JSImport("OptionalSpace.getNumberAtAsync", "moduleIdCanBeAnything")]
    private static partial Task<int> GetNumberAtAsync (int index);

    [JSImport("getStringAsync", "moduleIdCanBeAnything")]
    private static partial Task<string?> GetStringAsync ();

    // [JSImport("getBytesAsync", "moduleIdCanBeAnything")]
    // [return: JSMarshalAs<JSType.Promise<JSType.Array<JSType.Number>>>]
    // private static partial Task<byte[]> GetBytesAsync ();

    [JSExport]
    private static Task TestAsyncVoid () => Task.Delay(1);

    // [JSExport]
    // [return: JSMarshalAs<JSType.Promise<JSType.Array<JSType.Number>>>]
    // private static async Task<byte[]> EchoBytesAsync ()
    // {
    //     await Task.Delay(1);
    //     return await GetBytesAsync();
    // }

    [JSExport]
    private static int SumNumbers () => GetNumbers().Sum();

    [JSExport]
    private static async Task<int> SumNumbersAsync (int startIndex, int endIndex)
    {
        var sum = 0;
        for (int i = startIndex; i <= endIndex; i++)
            sum += await GetNumberAtAsync(i);
        return sum;
    }

    [JSExport]
    public static string BytesToString (byte[] bytes) => Encoding.UTF8.GetString(bytes);

    [JSExport]
    private static Task<string?> EchoAsync () => GetStringAsync();

    [JSExport]
    private static void ReceiveRecord ([JSMarshalAs<JSType.Array<JSType.Any>>] object?[] raw)
    {
        var record = Unmarshal(raw);
        Console.WriteLine($"Record({record.Str}, {record.Int}, {record.Bool}, Record({record.Other?.Str}, {record.Other?.Int}, {record.Other?.Bool}))");

        static Record Unmarshal (object?[] raw) => new(
            (string)raw[0]!,
            (int)(double)raw[1]!,
            (bool)raw[2]!,
            raw[3] != null ? Unmarshal(raw[3..7]) : null
        );
    }

    [JSExport] [return: JSMarshalAs<JSType.Array<JSType.Any>>]
    private static object?[] GetRecord ()
    {
        return new object?[] { "foo", 5, true, new object?[] { "bar", 6, false, null } };
    }

    [JSExport] [return: JSMarshalAs<JSType.Promise<JSType.Any>>]
    private static async Task<object> GetRecordAsync ()
    {
        await Task.Delay(1);
        return new object?[] { "foo", 7, true, new object?[] { "bar", 8, false, null } };
    }

    [JSExport] [return: JSMarshalAs<JSType.Promise<JSType.Any>>]
    private static async Task<object> GetArrayAsync ()
    {
        await Task.Delay(1);
        return new[] { "foo", "bar", "baz" };
    }

    [JSExport] [return: JSMarshalAs<JSType.Promise<JSType.Any>>]
    private static async Task<object> GetListAsync () // doesn't work, only arrays supported
    {
        await Task.Delay(1);
        return new List<string> { "foo", "bar", "baz" };
    }

    [JSExport] [return: JSMarshalAs<JSType.Promise<JSType.Any>>]
    private static async Task<object> GetDictionaryAsync () // doesn't work, only arrays supported
    {
        await Task.Delay(1);
        return new Dictionary<string, string> { ["foo"] = "bar", ["baz"] = "nya" };
    }

    [JSExport] [return: JSMarshalAs<JSType.Promise<JSType.Any>>]
    private static async Task<object> GetCollectionExpressionAsync () // doesn't work, only arrays supported
    {
        IReadOnlyList<string> list = ["foo", "bar", "baz"];
        await Task.Delay(1);
        return list;
    }

    // [JSExport]
    // private static string GetMessageFromOtherAssembly ()
    // {
    //     var assembly = Assembly.Load("OtherAssembly");
    //     var @class = assembly.GetType("OtherAssembly.TestReflection")!;
    //     var method = @class.GetMethod("GetMessage")!;
    //     return (string)method.Invoke(null, null)!;
    // }
    //
    // [JSExport]
    // private static string GetMessageFromMainAssembly ()
    // {
    //     var assembly = Assembly.Load("JSInteropTest");
    //     var @class = assembly.GetType("Program")!;
    //     var method = @class.GetMethod("GetMessageFromThisAssembly")!;
    //     return (string)method.Invoke(null, null)!;
    // }

    // public static partial string GetMessageFromThisAssembly ();
}

public record Record (string Str, int Int, bool Bool, Record? Other);
