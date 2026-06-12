@echo off
setlocal
cd /d "%~dp0"

if not exist node_modules (
  echo Instalando dependencias...
  call npm install
)

echo Abrindo o site em http://localhost:5173
start "Servidor do site" cmd /k "cd /d ""%~dp0"" && npm run dev -- --host 127.0.0.1"
timeout /t 3 /nobreak >nul
start "" "http://localhost:5173"

