# 🚀 Script de Deployment con Dominio Personalizado
# PowerShell script para desplegar el stack con dominio personalizado

param(
    [string]$Environment = "dev",
    [string]$Domain = "scrollprivate.work",
    [switch]$SkipBuild = $false
)

Write-Host "🌐 Desplegando MovieHome ScrollTV con dominio personalizado" -ForegroundColor Green
Write-Host "📍 Dominio: api.$Domain" -ForegroundColor Cyan
Write-Host "🏷️  Ambiente: $Environment" -ForegroundColor Cyan

# Verificar que estamos en el directorio correcto
if (!(Test-Path "cdk.json")) {
    Write-Error "❌ No se encontró cdk.json. Ejecuta este script desde la raíz del proyecto."
    exit 1
}

# Build del proyecto (opcional)
if (!$SkipBuild) {
    Write-Host "🔨 Compilando proyecto..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "❌ Error en la compilación"
        exit 1
    }
}

# Verificar configuración de AWS
Write-Host "🔍 Verificando configuración de AWS..." -ForegroundColor Yellow
aws sts get-caller-identity --output table
if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ Error: No se pudo verificar la configuración de AWS"
    exit 1
}

# Bootstrap CDK (si es necesario)
Write-Host "🏗️  Verificando bootstrap de CDK..." -ForegroundColor Yellow
npx cdk bootstrap

# Desplegar stacks en orden
Write-Host "📦 Desplegando Lambda Layer Stack..." -ForegroundColor Blue
npx cdk deploy LambdaLayerStack --require-approval never

Write-Host "🔐 Desplegando Lambda Role Stack..." -ForegroundColor Blue  
npx cdk deploy LambdaRoleStack --require-approval never

Write-Host "⚡ Desplegando Lambda Function Stack..." -ForegroundColor Blue
npx cdk deploy LambdaFunctionStack --require-approval never

Write-Host "🌐 Desplegando API Gateway Stack con dominio personalizado..." -ForegroundColor Blue
npx cdk deploy ApiGatewayStack --require-approval never

# Mostrar outputs importantes
Write-Host "`n✅ Deployment completado!" -ForegroundColor Green
Write-Host "📋 Obteniendo información del deployment..." -ForegroundColor Yellow

# Obtener outputs del stack
$stackName = "moviehome-0001-scrolltv-dev-api-gateway-stack"
$outputs = aws cloudformation describe-stacks --stack-name $stackName --query 'Stacks[0].Outputs' --output json | ConvertFrom-Json

Write-Host "`n🎯 URLs del API:" -ForegroundColor Cyan
foreach ($output in $outputs) {
    if ($output.OutputKey -eq "CustomDomainUrl") {
        Write-Host "   🌐 Dominio personalizado: $($output.OutputValue)" -ForegroundColor Green
    }
    if ($output.OutputKey -eq "ApiGatewayUrl") {
        Write-Host "   ☁️  AWS Original: $($output.OutputValue)" -ForegroundColor Gray
    }
}

Write-Host "`n🔧 Configuración de Cloudflare:" -ForegroundColor Cyan
foreach ($output in $outputs) {
    if ($output.OutputKey -eq "CustomDomainTarget") {
        Write-Host "   📍 Target CNAME: $($output.OutputValue)" -ForegroundColor Yellow
        Write-Host "   📝 Agrega este registro en Cloudflare:" -ForegroundColor White
        Write-Host "      Type: CNAME" -ForegroundColor Gray
        Write-Host "      Name: api" -ForegroundColor Gray
        Write-Host "      Target: $($output.OutputValue)" -ForegroundColor Gray
        Write-Host "      Proxy: DNS only (🟠)" -ForegroundColor Gray
    }
}

Write-Host "`n🔒 Certificado SSL:" -ForegroundColor Cyan
foreach ($output in $outputs) {
    if ($output.OutputKey -eq "CertificateArn") {
        Write-Host "   🎫 ARN: $($output.OutputValue)" -ForegroundColor Gray
    }
}

Write-Host "`n⏰ Próximos pasos:" -ForegroundColor Magenta
Write-Host "   1. Configura el registro CNAME en Cloudflare" -ForegroundColor White
Write-Host "   2. Espera 5-30 minutos para la validación del certificado" -ForegroundColor White
Write-Host "   3. Prueba el endpoint: https://api.$Domain/admin/platforms" -ForegroundColor White

Write-Host "`n🧪 Comando de prueba:" -ForegroundColor Cyan
Write-Host "curl -X GET https://api.$Domain/admin/platforms -H `"Content-Type: application/json`"" -ForegroundColor Gray

Write-Host "`n🎉 ¡Deployment completado exitosamente!" -ForegroundColor Green