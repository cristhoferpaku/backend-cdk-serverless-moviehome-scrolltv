#!/bin/bash

echo "🔨 Construyendo Lambda Layers..."

# Crear directorio de build si no existe
mkdir -p lib/lambda/layers/build

# Función para construir un layer
build_layer() {
    local layer_name=$1
    local layer_path="lib/lambda/layers/${layer_name}"
    local build_path="lib/lambda/layers/build"
    
    echo "📦 Construyendo layer: ${layer_name}"
    
    # Verificar que existe el directorio
    if [ ! -d "${layer_path}" ]; then
        echo "❌ Error: No existe el directorio ${layer_path}"
        return 1
    fi
    
    # Instalar dependencias si existe package.json
    if [ -f "${layer_path}/nodejs/package.json" ]; then
        echo "📥 Instalando dependencias para ${layer_name}..."
        cd "${layer_path}/nodejs"
        npm install --production
        cd - > /dev/null
    fi
    
    # Crear archivo .zip
    echo "🗜️ Comprimiendo ${layer_name}..."
    cd "${layer_path}"
    zip -r "../../build/${layer_name}.zip" . -x "*.git*" "*.DS_Store*" "node_modules/.cache/*"
    cd - > /dev/null
    
    echo "✅ Layer ${layer_name} construido: ${build_path}/${layer_name}.zip"
}

# Construir layers
build_layer "pg"
build_layer "utils"

echo "🎉 ¡Todos los layers construidos exitosamente!"
echo "📍 Archivos generados en: lib/lambda/layers/build/"
ls -la lib/lambda/layers/build/ 