# Migración de S3 a AWS Secrets Manager

## 📋 **Cambios Realizados**

Se ha actualizado el sistema para obtener la configuración de base de datos desde **AWS Secrets Manager** en lugar de S3, mejorando la seguridad y siguiendo las mejores prácticas de AWS.

## 🔄 **Archivos Modificados**

- ✅ **`secretsManagerConnector.ts`** - Nuevo conector para Secrets Manager
- ✅ **`dbConnector.ts`** - Actualizado para usar Secrets Manager
- ✅ **`package.json`** - Agregado `@aws-sdk/client-secrets-manager`

## 🛡️ **Configuración de AWS Secrets Manager**

### 1. **Crear el Secreto en AWS Console**

```bash
# Usar AWS CLI
aws secretsmanager create-secret \
    --name "/serverless-app/db/secret" \
    --description "Configuración de MovieHome ScrollTV para desarrollo" \
    --secret-string file://config.json
```

### 2. **Variables de Entorno**

```bash
# En tu Lambda Function
AWS_REGION=us-east-1
# Secret name está hardcodeado: "/serverless-app/db/secret"
```

### 3. **Formato del Secreto (JSON)**

```json
{
  "environment": "dev",
  "database": {
    "host": "your-rds-endpoint.amazonaws.com",
    "port": 5432,
    "database": "moviehomedbdev",
    "user": "moviehome_user",
    "password": "your_secure_password",
    "ssl": true
  },
  "cognito": {
    "userPoolId": "us-east-1_YUZFIapuX",
    "clientId": "4qc865p63ikv147tdanjhcm6me",
    "region": "us-east-1"
  }
}
```

## 🔐 **Permisos IAM Requeridos**

Tu Lambda Function necesita estos permisos:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": "arn:aws:secretsmanager:us-east-1:ACCOUNT-ID:secret:/serverless-app/db/secret-*"
    }
  ]
}
```

## 🚀 **Ventajas de Secrets Manager vs S3**

| Característica | S3 | Secrets Manager |
|---------------|----|--------------------|
| **Seguridad** | ❌ Menos seguro | ✅ Diseñado para secretos |
| **Rotación** | ❌ Manual | ✅ Automática |
| **Auditoría** | ⚠️ Limitada | ✅ Completa |
| **Costo** | ✅ Menor | ⚠️ Mayor (pero justificado) |
| **Encriptación** | ⚠️ Opcional | ✅ Por defecto |

## 📝 **Uso en el Código**

```typescript
import secretsManagerConnector from './secretsManagerConnector';

// Obtener configuración completa
const config = await secretsManagerConnector.getConfig();

// Obtener solo configuración de DB
const dbConfig = await secretsManagerConnector.getDatabaseConfig();

// Verificar si existe una configuración
const hasDb = await secretsManagerConnector.hasConfig('database.host');
```

## 🔧 **Comandos de Migración**

### Desde AWS CLI:
```bash
# 1. Exportar configuración actual de S3
aws s3 cp s3://moviehome-scrolltv-config-dev/config.json ./config.json

# 2. Crear secreto en Secrets Manager
aws secretsmanager create-secret \
    --name "/serverless-app/db/secret" \
    --secret-string file://config.json

# 3. Verificar que se creó correctamente
aws secretsmanager describe-secret --secret-id "/serverless-app/db/secret"
```

## ⚠️ **Notas Importantes**

1. **Naming Convention**: El nombre del secreto es fijo: `/serverless-app/db/secret`
2. **Caching**: La configuración se cachea en memoria para mejorar performance
3. **Error Handling**: Logs detallados para debug en caso de errores
4. **Health Check**: Función incluida para verificar conectividad

## 🐛 **Troubleshooting**

### Error común: "No se pudo obtener el secreto"
```bash
# Verificar permisos IAM
aws iam simulate-principal-policy \
    --principal-arn arn:aws:iam::ACCOUNT:role/LAMBDA-ROLE \
    --action-names secretsmanager:GetSecretValue \
    --resource-arns arn:aws:secretsmanager:REGION:ACCOUNT:secret:SECRET-NAME
```

### Error común: "JSON parse error"
```bash
# Verificar formato del secreto
aws secretsmanager get-secret-value \
    --secret-id "/serverless-app/db/secret" \
    --query SecretString --output text | jq .
``` 