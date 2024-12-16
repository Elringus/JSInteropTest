// noinspection JSFileReferences

// import * as runtimeModule from "./_framework/dotnet.runtime.js";
// import * as nativeModule from "./_framework/dotnet.native.js";
import { dotnet } from "./_framework/dotnet.js";

export async function boot() {
    /** @type {import("dotnet").MonoConfig & { assets: import("dotnet").AssetEntry[] }} */
    const config = {
        mainAssemblyName: "JSInteropTest.dll",
        assets: [
            {
                name: "/_framework/dotnet.runtime.js",
                // moduleExports: runtimeModule,
                behavior: "js-module-runtime"
            },
            {
                name: "/_framework/dotnet.native.js",
                // moduleExports: nativeModule,
                behavior: "js-module-native"
            },
            // {
            //     name: "/_framework/dotnet.native.worker.js",
            //     behavior: "js-module-threads"
            // },
            {
                name: "/_framework/dotnet.native.wasm",
                // buffer: await fetchBin("dotnet.native.wasm"),
                behavior: "dotnetwasm"
            },
            {
                name: "System.Private.CoreLib.wasm",
                resolvedUrl: "/_framework/System.Private.CoreLib.wasm",
                // buffer: await fetchBin("System.Private.CoreLib.wasm"),
                behavior: "assembly"
            },
            {
                name: "System.Runtime.InteropServices.JavaScript.wasm",
                // buffer: await fetchBin("System.Runtime.InteropServices.JavaScript.wasm"),
                behavior: "assembly",
                resolvedUrl: "/_framework/System.Runtime.InteropServices.JavaScript.wasm"
            },
            {
                name: "System.Console.wasm",
                // buffer: await fetchBin("System.Console.wasm"),
                behavior: "assembly",
                resolvedUrl: "/_framework/System.Console.wasm"
            },
            {
                name: "System.Linq.wasm",
                // buffer: await fetchBin("System.Linq.wasm"),
                behavior: "assembly",
                resolvedUrl: "/_framework/System.Linq.wasm"
            },
            {
                name: "System.Text.Json.wasm",
                // buffer: await fetchBin("System.Text.Json.wasm"),
                behavior: "assembly",
                resolvedUrl: "/_framework/System.Text.Json.wasm"
            },
            {
                name: "System.Text.Encodings.Web.wasm",
                // buffer: await fetchBin("System.Text.Encodings.Web.wasm"),
                behavior: "assembly",
                resolvedUrl: "/_framework/System.Text.Encodings.Web.wasm"
            },
            // {
            //     name: "System.Threading.Channels.wasm",
            //     // buffer: await fetchBin("System.Threading.Channels.wasm"),
            //     behavior: "assembly",
            //     resolvedUrl: "/_framework/System.Threading.Channels.wasm"
            // },
            {
                name: "System.Collections.wasm",
                // buffer: await fetchBin("System.Collections.wasm"),
                behavior: "assembly",
                resolvedUrl: "/_framework/System.Collections.wasm"
            },
            {
                name: "System.Collections.Concurrent.wasm",
                // buffer: await fetchBin("System.Collections.Concurrent.wasm"),
                behavior: "assembly",
                resolvedUrl: "/_framework/System.Collections.Concurrent.wasm"
            },
            {
                name: "System.IO.Pipelines.wasm",
                // buffer: await fetchBin("System.IO.Pipelines.wasm"),
                behavior: "assembly",
                resolvedUrl: "/_framework/System.IO.Pipelines.wasm"
            },
            {
                name: "System.Memory.wasm",
                // buffer: await fetchBin("System.Memory.wasm"),
                behavior: "assembly",
                resolvedUrl: "/_framework/System.Memory.wasm"
            },
            {
                name: "OtherAssembly.wasm",
                // buffer: await fetchBin("OtherAssembly.wasm"),
                behavior: "assembly",
                resolvedUrl: "/_framework/OtherAssembly.wasm"
            },
            {
                name: "JSInteropTest.wasm",
                // buffer: await fetchBin("JSInteropTest.wasm"),
                behavior: "assembly",
                resolvedUrl: "/_framework/JSInteropTest.wasm"
            }
        ]
    };

    // /** @type {import("dotnet").MonoConfig} */
    // const config = {
    //     mainAssemblyName: "JSInteropTest.dll",
    //     resources: {
    //         jsModuleRuntime: { "dotnet.runtime.js": "" },
    //         jsModuleNative: { "dotnet.native.js": "" },
    //         // jsModuleWorker: { "dotnet.native.worker.js": "" },
    //         wasmNative: { "dotnet.native.wasm": "" },
    //         assembly: {
    //             "System.Private.CoreLib.wasm": "",
    //             "System.Runtime.InteropServices.JavaScript.wasm": "",
    //             "System.Console.wasm": "",
    //             "System.Linq.wasm": "",
    //             // "System.Threading.Channels.wasm": "",
    //             "OtherAssembly.wasm": "",
    //             "JSInteropTest.wasm": "",
    //         }
    //     }
    // };

    const runtime = await dotnet
        .withConfig(config)
        // .withModuleConfig({
        //     locateFile: (path, prefix) => {
        //         // console.log(`locateFile(path: ${path} prefix: ${prefix})`)
        //         return "/_framework/bin/" + path;
        //     }
        // })
        // .withResourceLoader((type, name, defaultUri, integrity, behavior) => {
        //     // console.log(`withResourceLoader(type: ${type} name: ${name} defaultUri: ${defaultUri} behaviour: ${behavior})`)
        //     return "/_framework/bin/" + name;
        // })
        .create();
    console.log("Runtime created.")

    await runtime.runMain("JSInteropTest.dll", []);
    console.log("Runtime run.");

    return runtime;
}

// async function fetchBin(name) {
//     if (typeof window === "object") return new Uint8Array(await (await fetch(`./_framework/${name}`)).arrayBuffer());
//     return new Uint8Array((await (await import('node:fs/promises')).readFile(`./_framework/${name}`)));
// }

