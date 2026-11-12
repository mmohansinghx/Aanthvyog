$ErrorActionPreference = "Stop"
$nodeRoot = Join-Path $env:LOCALAPPDATA "AANTVYOG\toolchains\node-v24.22.3\extract"
$nodeExecutables = @(Get-ChildItem -LiteralPath $nodeRoot -Filter node.exe -File -Recurse)

if ($nodeExecutables.Count -ne 1) {
    throw "Expected one verified Node.js 24.22.3 executable under the local AANTVYOG toolchain folder. Found $($nodeExecutables.Count)."
}

$nodeDirectory = $nodeExecutables[0].DirectoryName
$env:Path = "$nodeDirectory;$env:Path"
$nodeVersion = & (Join-Path $nodeDirectory "node.exe") --version
if ($LASTEXITCODE -ne 0 -or $nodeVersion -ne "v24.22.3") {
    throw "The local Node.js runtime did not report the expected v24.22.3 version."
}

$npmVersion = & (Join-Path $nodeDirectory "npm.cmd") --version
Write-Output "Using Node.js $nodeVersion and npm $npmVersion for this PowerShell process only."
