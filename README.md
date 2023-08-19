# Environment
1. Install latest .NET SDK:
    ```powershell
    Invoke-WebRequest "https://dot.net/v1/dotnet-install.ps1" -OutFile "dotnet-install.ps1";
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass;
    ./dotnet-install.ps1 -Channel 8.0 -Quality daily;
    Remove-Item -Path ./dotnet-install.ps1 -Force;
    ```
2. Add workload manifest to `nuget.config`:
   - `<add key="dotnet8" value="https://pkgs.dev.azure.com/dnceng/public/_packaging/dotnet8/nuget/v3/index.json"/>`
3. Restore workload with `dotnet workload restore`

# Project
1. Run `dotnet publish`
2. Rename `AppBundle/_framework` to `AppBundle/bin`
3. Move `AppBundle/bin/dotnet.js` to `AppBundle/dotnet.js` (otherwise it's implicitly loading native and runtime js modules from the same dir)
4. Run `serve` under `AppBundle` dir
5. Open the served index page in browser
