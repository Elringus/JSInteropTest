import { dotnet } from "./_framework/dotnet.js";

(async function () {
    const config = {
        mainAssemblyName: "Test.dll",
        assets: [
            {
                name: "dotnet.js",
                // buffer: await fetchBinary("dotnet.js"),
                behavior: "js-module-dotnet"
            },
            {
                name: "dotnet.native.js",
                // buffer: await fetchBinary("dotnet.native.js"),
                behavior: "js-module-native"
            },
            {
                name: "dotnet.runtime.js",
                // buffer: await fetchBinary("dotnet.runtime.js"),
                behavior: "js-module-runtime"
            },
            {
                name: "dotnet.native.wasm",
                // buffer: await fetchBinary("dotnet.native.wasm"),
                behavior: "dotnetwasm"
            },
            {
                name: "System.Private.CoreLib.wasm",
                // buffer: await fetchBinary("System.Private.CoreLib.wasm"),
                behavior: "assembly"
            },
            {
                name: "System.Runtime.InteropServices.JavaScript.wasm",
                // buffer: await fetchBinary("System.Runtime.InteropServices.JavaScript.wasm"),
                behavior: "assembly"
            },
            {
                name: "System.Console.wasm",
                // buffer: await fetchBinary("System.Console.wasm"),
                behavior: "assembly"
            },
            {
                name: "System.Linq.wasm",
                // buffer: await fetchBinary("System.Linq.wasm"),
                behavior: "assembly"
            },
            {
                name: "Test.wasm",
                // buffer: await fetchBinary("Test.wasm"),
                behavior: "assembly"
            }
        ],
        globalizationMode: "invariant"
    };

    const runtime = await dotnet.withConfig(config).create();

    // setModuleImports("moduleIdCanBeAnything", {
    //     getStringAsync: async () => {
    //         await new Promise(res => setTimeout(res, 100));
    //         return "Hello from JS!";
    //     },
    //     OptionalSpace: {
    //         getNumbers: () => [5, 2],
    //         getNumberAtAsync: async (index) => {
    //             await new Promise(res => setTimeout(res, 100));
    //             return index;
    //         },
    //     }
    // });

    // await dotnet.run();
    // const exports = await getAssemblyExports(config.mainAssemblyName);

    // console.log(exports.Program.SumNumbers());
    // console.log(await exports.Program.SumNumbersAsync(1, 9));
    // console.log(await exports.Program.EchoAsync());
})();

async function fetchBinary(name) {
    const uri = `./_framework/${name}`;
    return new Uint8Array(await (await fetch(uri)).arrayBuffer());
}
