using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

Console.WriteLine("Hello, World!");

[SupportedOSPlatform("browser")]
public static partial class Program
{
    [JSImport("OptionalSpace.getNumbers", "moduleIdCanBeAnything")]
    public static partial int[] GetNumbers ();

    [JSImport("OptionalSpace.getNumberAtAsync", "moduleIdCanBeAnything")]
    public static partial Task<int> GetNumberAtAsync (int index);

    [JSImport("getStringAsync", "moduleIdCanBeAnything")]
    public static partial Task<string?> GetStringAsync ();

    [JSExport]
    public static int SumNumbers ()
    {
        return GetNumbers().Sum();
    }

    [JSExport]
    public static async Task<int> SumNumbersAsync (int startIndex, int endIndex)
    {
        var sum = 0;
        for (int i = startIndex; i <= endIndex; i++)
            sum += await GetNumberAtAsync(i);
        return sum;
    }

    [JSExport]
    public static Task<string?> EchoAsync ()
    {
        return GetStringAsync();
    }
}
