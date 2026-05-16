<#
Start all services in separate PowerShell windows.

Usage:
  From repo root run: pnpm run start:all

Edit the $services array below to match the folders and ports you want to start.
Each entry should have: name, path (relative to repo root), port, cmd (dev script to run).

#>

$root = (Resolve-Path "$PSScriptRoot\.." -ErrorAction Stop).Path

$services = @(
    @{ name = 'web-platform'; path = 'apps/web-platform'; port = 3000; cmd = 'pnpm run dev' },
    @{ name = 'marketing-site'; path = 'apps/marketing-site'; port = 3001; cmd = 'pnpm run dev' },
    @{ name = 'admin-panel'; path = 'apps/admin-panel'; port = 3002; cmd = 'pnpm run dev' },
    @{ name = 'auth-service'; path = 'services/auth-service'; port = 4001; cmd = 'pnpm run dev' },
    @{ name = 'user-service'; path = 'services/user-service'; port = 4002; cmd = 'pnpm run dev' }
)

Write-Host "Starting services in separate PowerShell windows..." -ForegroundColor Cyan

$launched = 0
foreach ($s in $services) {
    $servicePath = Join-Path $root $s.path
    if (-not (Test-Path $servicePath)) {
        Write-Warning "Path not found: $servicePath — skipping $($s.name)"
        continue
    }
    $port = $s.port
    $cmd = $s.cmd
    $escapedPath = $servicePath -replace "'","''"
    $command = "$env:PORT=$port; Set-Location -LiteralPath '$escapedPath'; $cmd"
    Start-Process powershell -ArgumentList "-NoExit","-Command",$command
    Start-Sleep -Milliseconds 200
    $launched++
}

Write-Host "Launched $launched service windows (where paths exist)." -ForegroundColor Green

Write-Host "If you prefer a single-terminal multiplexed view, consider installing 'concurrently' and using a pnpm script instead." -ForegroundColor Yellow
