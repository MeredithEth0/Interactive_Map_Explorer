# ============================
# start-project.ps1
# Runs Django backend + Frontend in one PowerShell window with color-coded logs
# ============================

# --- CONFIGURATION ---
$backendPath  = "$PSScriptRoot\servers"                  # Folder containing manage.py
$frontendPath = "$PSScriptRoot\client"                   # Folder of your frontend
$venvActivate = "$PSScriptRoot\venv\Scripts\Activate.ps1" # Path to Python venv Activate.ps1 script

Write-Host "🚀 Starting backend and frontend servers with color-coded output..." -ForegroundColor Cyan

# --- Function to print logs in color ---
function Write-ColoredOutput {
    param (
        [string]$Prefix,
        [string]$Color,
        [string]$Line
    )
    Write-Host "${Prefix}: $Line" -ForegroundColor $Color
}

# --- Start backend job ---
$backendJob = Start-Job -Name "Backend" -ScriptBlock {
    cd $using:backendPath
    . $using:venvActivate
    python manage.py runserver 2>&1 | ForEach-Object { Write-Output $_ }
}

# --- Start frontend job ---
$frontendJob = Start-Job -Name "Frontend" -ScriptBlock {
    cd $using:frontendPath
    npm start 2>&1 | ForEach-Object { Write-Output $_ }
}

Write-Host '✅ Both servers are now running in background jobs.' -ForegroundColor Green
Write-Host '📜 Press Ctrl+C to stop viewing logs, then run ( Stop-Job * ) to stop all servers.' -ForegroundColor Yellow

# --- Stream logs from both jobs ---
while ($true) {
    # Backend logs (orange / dark yellow)
    $backendOutput = Receive-Job -Name 'Backend' -Keep
    foreach ($line in $backendOutput) {
        Write-ColoredOutput -Prefix '[Backend]' -Color 'DarkYellow' -Line $line
    }

    # Frontend logs (cyan)
    $frontendOutput = Receive-Job -Name 'Frontend' -Keep
    foreach ($line in $frontendOutput) {
        Write-ColoredOutput -Prefix '[Frontend]' -Color 'Cyan' -Line $line
    }

    Start-Sleep -Milliseconds 500
}
