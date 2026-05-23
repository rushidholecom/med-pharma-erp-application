[CmdletBinding()]
param(
    [ValidateSet("init", "up", "down", "restart", "logs", "ps", "config")]
    [string]$Action = "up",
    [string]$Service
)

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$envExamplePath = Join-Path $repoRoot ".env.example"
$envPath = Join-Path $repoRoot ".env"

function Ensure-EnvFile {
    if (Test-Path $envPath) {
        return $true
    }

    Copy-Item -LiteralPath $envExamplePath -Destination $envPath
    Write-Host "Created .env from .env.example at $envPath"
    Write-Host "Update the values in .env, then rerun this command."
    return $false
}

function Invoke-Compose {
    param(
        [string[]]$ComposeArgs
    )

    Push-Location $repoRoot
    try {
        & docker compose --env-file $envPath @ComposeArgs
    }
    finally {
        Pop-Location
    }
}

switch ($Action) {
    "init" {
        if (Test-Path $envPath) {
            Write-Host ".env already exists at $envPath"
        }
        else {
            Copy-Item -LiteralPath $envExamplePath -Destination $envPath
            Write-Host "Created .env from .env.example at $envPath"
        }
    }
    "up" {
        if (Ensure-EnvFile) {
            if ($Service) {
                Invoke-Compose @("up", "-d", "--build", $Service)
            }
            else {
                Invoke-Compose @("up", "-d", "--build")
            }
        }
    }
    "down" {
        if (Ensure-EnvFile) {
            Invoke-Compose @("down")
        }
    }
    "restart" {
        if (Ensure-EnvFile) {
            if ($Service) {
                Invoke-Compose @("restart", $Service)
            }
            else {
                Invoke-Compose @("restart")
            }
        }
    }
    "logs" {
        if (Ensure-EnvFile) {
            if ($Service) {
                Invoke-Compose @("logs", "-f", $Service)
            }
            else {
                Invoke-Compose @("logs", "-f")
            }
        }
    }
    "ps" {
        if (Ensure-EnvFile) {
            Invoke-Compose @("ps")
        }
    }
    "config" {
        if (Ensure-EnvFile) {
            Invoke-Compose @("config")
        }
    }
}
