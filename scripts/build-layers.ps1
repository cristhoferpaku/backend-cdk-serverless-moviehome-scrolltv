Write-Host "Construyendo Lambda Layers..." -ForegroundColor Green

# Obtener directorio actual
$currentDir = Get-Location

# Crear directorio de build si no existe
$buildPath = "lib/lambda/layers/build"
if (!(Test-Path $buildPath)) {
    New-Item -ItemType Directory -Path $buildPath -Force | Out-Null
}

function Build-Layer {
    param([string]$LayerName)
    
    $layerPath = "lib/lambda/layers/$LayerName"
    
    Write-Host "Construyendo layer: $LayerName" -ForegroundColor Cyan
    
    # Verificar que existe el directorio
    if (!(Test-Path $layerPath)) {
        Write-Host "Error: No existe el directorio $layerPath" -ForegroundColor Red
        return
    }
    
    # Instalar dependencias si existe package.json
    $packageJsonPath = "$layerPath/nodejs/package.json"
    if (Test-Path $packageJsonPath) {
        Write-Host "Instalando dependencias para $LayerName..." -ForegroundColor Yellow
        Push-Location "$layerPath/nodejs"
        npm install --production
        Pop-Location
    }
    
    # Crear archivo .zip
    Write-Host "Comprimiendo $LayerName..." -ForegroundColor Yellow
    $zipPath = "$buildPath/$LayerName.zip"
    
    # Eliminar zip anterior si existe
    if (Test-Path $zipPath) {
        Remove-Item $zipPath -Force
    }
    
    # Comprimir usando PowerShell
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::CreateFromDirectory((Resolve-Path $layerPath).Path, (Resolve-Path $buildPath).Path + "\$LayerName.zip")
    
    Write-Host "Layer $LayerName construido: $zipPath" -ForegroundColor Green
}

# Construir layers
Build-Layer "pg"
Build-Layer "utils"

Write-Host "Todos los layers construidos exitosamente!" -ForegroundColor Green
Write-Host "Archivos generados en: $buildPath" -ForegroundColor Cyan

# Verificar archivos generados
if (Test-Path $buildPath) {
    Get-ChildItem $buildPath
} else {
    Write-Host "Error: No se pudo encontrar el directorio $buildPath" -ForegroundColor Red
} 