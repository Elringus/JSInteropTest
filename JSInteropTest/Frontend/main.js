import { boot } from "./boot.js"

(async function () {
    console.log("Started in main.js");
    const runtime = await boot();

    const exports = await runtime.getAssemblyExports("JSInteropTest");
    console.log("Got exports in main.js");

    const bindings = {
        log: (msg) => console.log(msg),
        getStringAsync: async () => {
            await new Promise(res => setTimeout(res, 100));
            return "Hello from JS!";
        },
        getBytesAsync: async () => new Uint8Array([
            0x45, 0x76, 0x65, 0x72, 0x79, 0x74, 0x68, 0x69, 0x6e,
            0x67, 0x27, 0x73, 0x20, 0x73, 0x68, 0x69, 0x6e, 0x79,
            0x2c, 0x20, 0x43, 0x61, 0x70, 0x74, 0x61, 0x69, 0x6e,
            0x2e, 0x20, 0x4e, 0x6f, 0x74, 0x20, 0x74, 0x6f, 0x20,
            0x66, 0x72, 0x65, 0x74, 0x2e
        ]),
        OptionalSpace: {
            get getNumbers() { return this.$getNumbers; },
            set getNumbers($getNumbers) { this.$getNumbers = () => $getNumbers(); },
            getNumberAtAsync: async (index) => {
                await new Promise(res => setTimeout(res, 100));
                return index;
            }
        }
    };
    runtime.setModuleImports("moduleIdCanBeAnything", bindings);
    bindings.OptionalSpace.getNumbers = () => [5, 2];
    console.log("Set imports in main.js");

    console.log(`Summed numbers: ${exports.Program.SumNumbers()}`);

    await exports.Program.TestAsyncVoid();
    console.log("Waited for async void.")

    console.log(`Summed numbers async: ${await exports.Program.SumNumbersAsync(1, 9)}`);
    console.log(`Echoed string async: ${await exports.Program.EchoAsync()}`);
    // console.log(`Echoed bytes async: ${exports.Program.BytesToString(await exports.Program.EchoBytesAsync())}`);
    exports.Program.ReceiveRecord(["foo", 1, true, "bar", 2, false, null]);
    console.log(`Got record: ${JSON.stringify(exports.Program.GetRecord())}`);
    console.log(`Got record async: ${JSON.stringify(await exports.Program.GetRecordAsync())}`);
    console.log(`Got array via object nested in task: ${JSON.stringify(await exports.Program.GetArrayAsync())}`);
    console.log(`Got list via object nested in task: ${JSON.stringify(await exports.Program.GetListAsync())}`);
    console.log(`Got dictionary via object nested in task: ${JSON.stringify(await exports.Program.GetDictionaryAsync())}`);
    console.log(`Got collection expression via object nested in task: ${JSON.stringify(await exports.Program.GetCollectionExpressionAsync())}`);

    console.log("Completed in main.js");
})();
