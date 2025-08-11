# 🌐 Configuración de Dominio Personalizado con Cloudflare

## 📋 Resumen
Tu API Gateway ahora está configurado para usar el dominio personalizado `api.scrollprivate.work` con certificado SSL automático.

## 🚀 URLs del API
- **Producción**: `https://api.scrollprivate.work/`
- **Desarrollo**: `https://api.scrollprivate.work/dev/`
- **AWS Original**: `https://[api-id].execute-api.[region].amazonaws.com/`

## 🔧 Pasos para Configurar Cloudflare

### 1. Desplegar el Stack CDK
```bash
# Desde la carpeta del proyecto
npm run build
cdk deploy --all

# O específicamente el API Gateway
cdk deploy ApiGatewayStack
```

### 2. Obtener el Target CNAME
Después del deployment, CDK mostrará outputs como:
```
ApiGatewayStack.CustomDomainTarget = d-xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
ApiGatewayStack.CustomDomainUrl = https://api.scrollprivate.work
```

### 3. Configurar DNS en Cloudflare

#### Opción A: CNAME (Recomendado)
1. Ve a tu dashboard de Cloudflare
2. Selecciona el dominio `scrollprivate.work`
3. Ve a la sección **DNS**
4. Agrega un registro CNAME:
   - **Type**: CNAME
   - **Name**: `api`
   - **Target**: `[CustomDomainTarget del output]`
   - **Proxy status**: 🟠 DNS only (sin proxy)
   - **TTL**: Auto

#### Opción B: A Record (Alternativa)
Si prefieres usar A record, necesitarás obtener la IP del target:
```bash
nslookup [CustomDomainTarget]
```

### 4. Verificar Certificado SSL
El certificado se creará automáticamente via DNS validation. AWS verificará que controlas el dominio.

### 5. Probar la Configuración
```bash
# Verificar que el dominio resuelve
nslookup api.scrollprivate.work

# Probar el endpoint
curl https://api.scrollprivate.work/admin/platforms
```

## 🔒 Configuración de Seguridad

### Headers de Seguridad en Cloudflare
Considera agregar estos headers en Cloudflare:
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `X-XSS-Protection`

### SSL/TLS Settings
- **SSL/TLS encryption mode**: Full (strict)
- **Minimum TLS Version**: 1.2
- **Always Use HTTPS**: On

## 📊 Estructura de Endpoints

### Admin API (Existente)
```
https://api.scrollprivate.work/admin/
├── auth/
│   ├── login (POST)
│   └── refresh-token (POST)
├── users/ (GET, POST, PUT, DELETE)
├── platforms/ (GET)
├── packages/ (GET, POST, PUT, DELETE)
├── content/ (GET, POST, PUT, DELETE)
└── revendedores/ (GET, POST)
```

### Mobile API (Futuro)
```
https://api.scrollprivate.work/mobile/
├── auth/ (POST)
├── content/ (GET)
├── search/ (GET)
└── profile/ (GET, PUT)
```

## 🛠️ Troubleshooting

### Error: Certificate Validation Failed
- Verifica que el dominio esté correctamente configurado en Cloudflare
- Asegúrate de que el proxy esté deshabilitado para el subdominio `api`

### Error: Domain Not Found
- Espera 5-10 minutos después del deployment
- Verifica la configuración DNS en Cloudflare

### Error: SSL Certificate Issues
- El certificado puede tardar hasta 30 minutos en validarse
- Verifica que no hay registros DNS conflictivos

## 📝 Comandos Útiles

```bash
# Ver el estado del stack
cdk list

# Ver los outputs del stack
aws cloudformation describe-stacks --stack-name [stack-name] --query 'Stacks[0].Outputs'

# Verificar el certificado
aws acm list-certificates --region us-east-1

# Probar el endpoint
curl -X GET https://api.scrollprivate.work/admin/platforms \
  -H "Content-Type: application/json"
```

## 🎯 Próximos Pasos

1. **Desplegar el stack** con `cdk deploy --all`
2. **Configurar DNS** en Cloudflare con el target CNAME
3. **Esperar validación** del certificado SSL (5-30 min)
4. **Probar endpoints** con el nuevo dominio
5. **Actualizar frontend** para usar `api.scrollprivate.work`

## 💡 Beneficios del Dominio Personalizado

✅ **Profesional**: URL limpia y branded
✅ **SSL Automático**: Certificado gestionado por AWS
✅ **Escalable**: Fácil agregar subdominios
✅ **Flexible**: Separar dev/prod por path o subdominio
✅ **Cacheable**: Compatible con CDN de Cloudflare