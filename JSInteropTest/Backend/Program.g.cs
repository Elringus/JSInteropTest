using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

public static partial class Program
{
    [ModuleInitializer]
    [DynamicDependency(DynamicallyAccessedMemberTypes.PublicMethods, "Program", "JSInteropTest")]
    [DynamicDependency(DynamicallyAccessedMemberTypes.PublicMethods, "OtherAssembly.TestReflection", "OtherAssembly")]
    internal static void RegisterDynamicDependencies () { }
    
    // public static partial string GetMessageFromThisAssembly () => "Message from main assembly.";
}
