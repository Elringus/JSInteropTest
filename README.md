# Setup
1. Install latest .NET SDK:
    ```powershell
    Invoke-WebRequest "https://dot.net/v1/dotnet-install.ps1" -OutFile "dotnet-install.ps1";
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass;
    ./dotnet-install.ps1 -Channel 8.0 -Quality daily;
    Remove-Item -Path ./dotnet-install.ps1 -Force;
    ```
2. Make sure pre-release workload manifest is in `nuget.config`:
   - `<add key="dotnet8" value="https://pkgs.dev.azure.com/dnceng/public/_packaging/dotnet8/nuget/v3/index.json"/>`
3. Restore workload with `dotnet workload restore`
4. Run `dotnet publish`

# Browser
1. Run `serve` under `AppBundle` dir
2. Open the served index page in browser

# Node
1. Run `node main.js` under `AppBundle` dir
