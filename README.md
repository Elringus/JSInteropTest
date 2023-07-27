# Repro Steps

1. Run `dotnet publish`
2. Copy `index.html` from root to `AppBundle` of the output dir
3. Copy `dotnet.native.wasm`, `dotnet.native.js` and `dotnet.runtime.js` to `AppBundle/managed`
4. Run `serve` under `AppBundle` dir
5. Open the served index page in browser
