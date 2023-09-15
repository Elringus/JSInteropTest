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
    
    console.log(exports.Program.GetMessageFromMainAssembly());
    console.log(exports.Program.GetMessageFromOtherAssembly());
    console.log(exports.Program.SumNumbers());
    console.log(await exports.Program.SumNumbersAsync(1, 9));
    console.log(await exports.Program.EchoAsync());
    console.log("Completed in main.js");
})();
