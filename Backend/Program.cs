using System.Runtime.InteropServices.JavaScript;

Console.WriteLine("Booted main in C#.");

public static partial class Program
{
    [JSImport("OptionalSpace.getNumbers", "moduleIdCanBeAnything")]
    private static partial int[] GetNumbers ();

    [JSImport("OptionalSpace.getNumberAtAsync", "moduleIdCanBeAnything")]
    private static partial Task<int> GetNumberAtAsync (int index);

    [JSImport("getStringAsync", "moduleIdCanBeAnything")]
    private static partial Task<string?> GetStringAsync ();

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
    private static Task<string?> EchoAsync () => GetStringAsync();
}
