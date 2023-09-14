// noinspection JSFileReferences

import * as runtimeModule from "./_framework/dotnet.runtime.js";
import * as nativeModule from "./_framework/dotnet.native.js";
import { dotnet } from "./_framework/dotnet.js";

export async function boot() {
    /** @type {import("dotnet").MonoConfig & { assets: import("dotnet").AssetEntry[] }} */
    const config = {
        mainAssemblyName: "JSInteropTest.dll",
        assets: [
            {
                name: "dotnet.runtime.js",
                moduleExports: runtimeModule,
                behavior: "js-module-runtime"
            },
            {
                name: "dotnet.native.js",
                moduleExports: nativeModule,
                behavior: "js-module-native"
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
                name: "OtherAssembly.wasm",
                buffer: await fetchBin("OtherAssembly.wasm"),
                behavior: "assembly"
            },
            {
                name: "JSInteropTest.wasm",
                buffer: await fetchBin("JSInteropTest.wasm"),
                behavior: "assembly"
            }
        ]
    };

    const runtime = await dotnet.withExitCodeLogging().withConfig(config).create();
    console.log("Runtime created.")

    await dotnet.run();
    console.log("Runtime run.");
    
    return runtime;
}

async function fetchBin(name) {
    if (typeof window === "object") return new Uint8Array(await (await fetch(`./_framework/${name}`)).arrayBuffer());
    return new Uint8Array((await (await import('node:fs/promises')).readFile(`./_framework/${name}`)));
}

