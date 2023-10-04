// noinspection JSFileReferences

import * as runtimeModule from "./_framework/dotnet.runtime.js";
import * as nativeModule from "./_framework/dotnet.native.js";
import { dotnet } from "./_framework/dotnet.js";

export async function boot() {
    /** @type {import("dotnet").MonoConfig & { assets: import("dotnet").AssetEntry[] }} */
    // const config = {
    //     mainAssemblyName: "JSInteropTest.dll",
    //     assets: [
    //         {
    //             name: "dotnet.runtime.js",
    //             // moduleExports: runtimeModule,
    //             behavior: "js-module-runtime"
    //         },
    //         {
    //             name: "dotnet.native.js",
    //             // moduleExports: nativeModule,
    //             behavior: "js-module-native"
    //         },
    //         {
    //             name: "dotnet.native.worker.js",
    //             behavior: "js-module-threads"
    //         },
    //         {
    //             name: "dotnet.native.wasm",
    //             // buffer: await fetchBin("dotnet.native.wasm"),
    //             behavior: "dotnetwasm"
    //         },
    //         {
    //             name: "System.Private.CoreLib.wasm",
    //             buffer: await fetchBin("System.Private.CoreLib.wasm"),
    //             behavior: "assembly"
    //         },
    //         {
    //             name: "System.Runtime.InteropServices.JavaScript.wasm",
    //             buffer: await fetchBin("System.Runtime.InteropServices.JavaScript.wasm"),
    //             behavior: "assembly"
    //         },
    //         {
    //             name: "System.Console.wasm",
    //             buffer: await fetchBin("System.Console.wasm"),
    //             behavior: "assembly"
    //         },
    //         {
    //             name: "System.Linq.wasm",
    //             buffer: await fetchBin("System.Linq.wasm"),
    //             behavior: "assembly"
    //         },
    //         {
    //             name: "System.Threading.Channels.wasm",
    //             buffer: await fetchBin("System.Threading.Channels.wasm"),
    //             behavior: "assembly"
    //         },
    //         {
    //             name: "OtherAssembly.wasm",
    //             buffer: await fetchBin("OtherAssembly.wasm"),
    //             behavior: "assembly"
    //         },
    //         {
    //             name: "JSInteropTest.wasm",
    //             buffer: await fetchBin("JSInteropTest.wasm"),
    //             behavior: "assembly"
    //         }
    //     ]
    // };

    /** @type {import("dotnet").MonoConfig} */
    const config = {
        mainAssemblyName: "JSInteropTest.dll",
        resources: {
            jsModuleRuntime: { "dotnet.runtime.js": "" },
            jsModuleNative: { "dotnet.native.js": "" },
            jsModuleWorker: { "dotnet.native.worker.js": "" },
            wasmNative: { "dotnet.native.wasm": "" },
            wasmSymbols: { "dotnet.native.js.symbols": "" },
            assembly: {
                "System.Private.CoreLib.wasm": "",
                "System.Runtime.InteropServices.JavaScript.wasm": "",
                "System.Console.wasm": "",
                "System.Linq.wasm": "",
                "System.Threading.Channels.wasm": "",
                "OtherAssembly.wasm": "",
                "JSInteropTest.wasm": "",
            }
        }
    };

    const runtime = await dotnet.withExitCodeLogging().withConfig(config).create();
    console.log("Runtime created.")

    await runtime.runMain("JSInteropTest.dll", []);
    console.log("Runtime run.");

    return runtime;
}

async function fetchBin(name) {
    if (typeof window === "object") return new Uint8Array(await (await fetch(`./_framework/${name}`)).arrayBuffer());
    return new Uint8Array((await (await import('node:fs/promises')).readFile(`./_framework/${name}`)));
}

