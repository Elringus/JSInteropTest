// noinspection JSFileReferences

import { boot } from "./bootsharp.js";

(async function () {
    console.log("Started in main.");
    const exports = await boot();
    console.log("Booted in main.");
    console.log(exports.Program.SumNumbers());
    console.log(await exports.Program.SumNumbersAsync(1, 9));
    console.log(await exports.Program.EchoAsync());
    console.log("Completed.");
})();
