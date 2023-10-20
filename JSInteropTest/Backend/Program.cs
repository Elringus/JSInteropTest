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

    [JSImport("getBytesAsync", "moduleIdCanBeAnything")]
    [return: JSMarshalAs<JSType.Promise<JSType.Array<JSType.Number>>>]
    private static partial Task<byte[]> GetBytesAsync ();

    [JSExport]
    private static Task TestAsyncVoid () => Task.Delay(1);

    [JSExport]
    [return: JSMarshalAs<JSType.Promise<JSType.Array<JSType.Number>>>]
    private static async Task<byte[]> EchoBytesAsync ()
    {
        await Task.Delay(1);
        return await GetBytesAsync();
    }

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
