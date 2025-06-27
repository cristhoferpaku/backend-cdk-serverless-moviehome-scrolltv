#!/bin/bash

# Script para subir configuración a S3
# Uso: ./upload-config.sh [dev|prod] [archivo-config]

set -e

STAGE=${1:-dev}
CONFIG_FILE=${2:-"config-examples/config.json"}
BUCKET_NAME="moviehome-scrolltv-config-${STAGE}"

echo "🚀 Subiendo configuración para stage: ${STAGE}"
echo "📁 Archivo: ${CONFIG_FILE}"
echo "🪣 Bucket: ${BUCKET_NAME}"

# Verificar si el archivo existe
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Error: El archivo $CONFIG_FILE no existe"
    exit 1
fi

# Verificar si el bucket existe, si no, crearlo
if ! aws s3 ls "s3://${BUCKET_NAME}" 2>&1 | grep -q 'NoSuchBucket'; then
    echo "✅ Bucket ${BUCKET_NAME} encontrado"
else
    echo "📦 Creando bucket ${BUCKET_NAME}..."
    aws s3 mb "s3://${BUCKET_NAME}"
    
    # Configurar versionado
    aws s3api put-bucket-versioning \
        --bucket "${BUCKET_NAME}" \
        --versioning-configuration Status=Enabled
    
    # Configurar encriptación
    aws s3api put-bucket-encryption \
        --bucket "${BUCKET_NAME}" \
        --server-side-encryption-configuration '{
            "Rules": [
                {
                    "ApplyServerSideEncryptionByDefault": {
                        "SSEAlgorithm": "AES256"
                    }
                }
            ]
        }'
fi

# Subir el archivo
echo "📤 Subiendo configuración..."
aws s3 cp "$CONFIG_FILE" "s3://${BUCKET_NAME}/config.json" \
    --metadata "stage=${STAGE},uploaded=$(date -u +%Y-%m-%dT%H:%M:%SZ)"

echo "✅ Configuración subida exitosamente!"
echo "🔗 URI: s3://${BUCKET_NAME}/config.json"

# Mostrar contenido para verificación
echo ""
echo "📋 Contenido subido:"
aws s3 cp "s3://${BUCKET_NAME}/config.json" - | jq '.' 