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

    [JSImport("importArrayAsync", "moduleIdCanBeAnything")] [return: JSMarshalAs<JSType.Promise<JSType.Any>>]
    private static partial Task<object> ImportArrayAsync ();

    // [JSImport("getBytesAsync", "moduleIdCanBeAnything")]
    // [return: JSMarshalAs<JSType.Promise<JSType.Array<JSType.Number>>>]
    // private static partial Task<byte[]> GetBytesAsync ();

    [JSExport]
    private static Task TestAsyncVoid () => Task.Delay(1);

    [JSExport]
    private static double EchoDouble (double d) => d;

    [JSExport]
    private static async Task TestImportArrayAsync ()
    {
        var arr = (byte[])await ImportArrayAsync();
        Console.WriteLine($"Imported array async: {string.Join(", ", arr)}");
    }

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
    private static void ReceiveRecord ([JSMarshalAs<JSType.Any>] object raw)
    {
        var record = Unmarshal((object?[])raw);
        Console.WriteLine($"Record({record.Str}, {record.Int}, {record.Bool}, {record.Double}, Record({record.Other?.Str}, {record.Other?.Int}, {record.Other?.Bool}, {record.Other?.Double}))");

        static Record Unmarshal (object?[] raw) => new(
            (string)raw[0]!,
            (int)(double)raw[1]!,
            (bool)raw[2]!,
            (double)raw[3]!,
            raw[4] != null ? Unmarshal(raw[4..]) : null
        );
    }

    [JSExport] [return: JSMarshalAs<JSType.Any>]
    private static object GetRecord ()
    {
        return new object?[] { "foo", 5, true, 20.005, new object?[] { "bar", 6, false, 15.9, null } };
    }

    [JSExport] [return: JSMarshalAs<JSType.Promise<JSType.Any>>]
    private static async Task<object> GetRecordAsync ()
    {
        await Task.Delay(1);
        return new object?[] { "foo", 7, true, 20.005, new object?[] { "bar", 8, false, 15.9, null } };
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

    [JSExport] [return: JSMarshalAs<JSType.Any>]
    private static object GetInlineArray () // doesn't work, inline arrays are not supported
    {
        var arr = new InlineArray();
        arr[0] = "foo";
        arr[1] = "bar";
        arr[2] = "baz";
        return arr;
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

public record Record (string Str, int Int, bool Bool, double Double, Record? Other);

[System.Runtime.CompilerServices.InlineArray(3)]
public struct InlineArray
{
    private string _element0;
}
