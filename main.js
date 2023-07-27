import { dotnet } from "./dotnet.js";

(async function () {
    const config = {
        mainAssemblyName: "Test.dll",
        assemblyRootFolder: "managed",
        assets: [
            {
                behavior: "dotnetwasm",
                buffer: await fetchBinary("dotnet.native.wasm"),
                name: "dotnet.native.wasm"
            },
            {
                behavior: "js-module-native",
                // buffer: await fetchBinary("dotnet.native.js"),
                name: "dotnet.native.js"
            },
            {
                behavior: "js-module-runtime",
                // buffer: await fetchBinary("dotnet.runtime.js"),
                name: "dotnet.runtime.js"
            },
            {
                behavior: "assembly",
                buffer: await fetchBinary("System.Console.wasm"),
                name: "System.Console.wasm"
            },
            {
                behavior: "assembly",
                buffer: await fetchBinary("System.Linq.wasm"),
                name: "System.Linq.wasm"
            },
            {
                behavior: "assembly",
                buffer: await fetchBinary("System.Private.CoreLib.wasm"),
                name: "System.Private.CoreLib.wasm"
            },
            {
                behavior: "assembly",
                buffer: await fetchBinary("System.Runtime.InteropServices.JavaScript.wasm"),
                name: "System.Runtime.InteropServices.JavaScript.wasm"
            },
            {
                behavior: "assembly",
                buffer: await fetchBinary("Test.wasm"),
                name: "Test.wasm"
            }
        ],
        remoteSources: [],
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
    const uri = `./managed/${name}`;
    return new Uint8Array(await (await fetch(uri)).arrayBuffer());
}
