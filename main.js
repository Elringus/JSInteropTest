import { dotnet } from "./dotnet.js";

(async function () {
    const config = {
        mainAssemblyName: "Test.dll",
        assets: [
            {
                name: "dotnet.native.js",
                buffer: await fetchBin("dotnet.native.js"),
                behavior: "js-module-native"
            },
            {
                name: "dotnet.runtime.js",
                buffer: await fetchBin("dotnet.runtime.js"),
                behavior: "js-module-runtime"
            },
            {
                name: "dotnet.native.wasm",
                buffer: await fetchBin("dotnet.native.wasm"),
                behavior: "dotnetwasm"
            },
            {
                name: "System.Private.CoreLib.wasm",
                buffer: await fetchBin("System.Private.CoreLib.wasm"),
                behavior: "assembly"
            },
            {
                name: "System.Runtime.InteropServices.JavaScript.wasm",
                buffer: await fetchBin("System.Runtime.InteropServices.JavaScript.wasm"),
                behavior: "assembly"
            },
            {
                name: "System.Console.wasm",
                buffer: await fetchBin("System.Console.wasm"),
                behavior: "assembly"
            },
            {
                name: "System.Linq.wasm",
                buffer: await fetchBin("System.Linq.wasm"),
                behavior: "assembly"
            },
            {
                name: "Test.wasm",
                buffer: await fetchBin("Test.wasm"),
                behavior: "assembly"
            }
        ]
    };

    const runtime = await dotnet.withConfig(config).create();

    // runtime.setModuleImports("moduleIdCanBeAnything", {
    //     getStringAsync: async () => {
    //         await new Promise(res => setTimeout(res, 100));
    //         return "Hello from JS!";
    //     },
    //     OptionalSpace: {
    //         getNumbers: () => [5, 2],
    //         getNumberAtAsync: async (index) => {
    //             await new Promise(res => setTimeout(res, 100));
    //             return index;
    //         }
    //     }
    // });
    //
    // await dotnet.run();
    // const exports = await runtime.getAssemblyExports(config.mainAssemblyName);
    //
    // console.log(exports.Program.SumNumbers());
    // console.log(await exports.Program.SumNumbersAsync(1, 9));
    // console.log(await exports.Program.EchoAsync());
})();

async function fetchBin(name) {
    return new Uint8Array(await (await fetch(`./bin/${name}`)).arrayBuffer());
}

