import { boot } from "./boot.js"

(async function () {
    console.log("Started in main.js");
    const exports = await boot();
    console.log("Booted in main.js");
    console.log(exports.Program.GetMessageFromMainAssembly());
    console.log(exports.Program.GetMessageFromOtherAssembly());
    console.log(exports.Program.SumNumbers());
    console.log(await exports.Program.SumNumbersAsync(1, 9));
    console.log(await exports.Program.EchoAsync());
    console.log("Completed in main.js");
})();
