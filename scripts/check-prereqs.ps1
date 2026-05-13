$tools = @(
    @{ Name = "java"; Hint = "Install Java 17+ and add it to PATH." },
    @{ Name = "mvn"; Hint = "Install Maven 3.9+ and add it to PATH." },
    @{ Name = "node"; Hint = "Install Node.js 20+ and add it to PATH." },
    @{ Name = "npm"; Hint = "npm is usually installed with Node.js." }
)

foreach ($tool in $tools) {
    $command = Get-Command $tool.Name -ErrorAction SilentlyContinue

    if ($null -eq $command) {
        Write-Host "[MISSING] $($tool.Name) - $($tool.Hint)" -ForegroundColor Yellow
    } else {
        Write-Host "[OK] $($tool.Name) -> $($command.Source)" -ForegroundColor Green
    }
}

