# Arquitectura Modular - MovieHome ScrollTV Backend

## Descripción General

La infraestructura del backend de MovieHome ScrollTV ha sido refactorizada para seguir una arquitectura modular basada en múltiples stacks especializados. Esta separación mejora la mantenibilidad, escalabilidad y permite despliegues independientes de cada componente.

## Estructura de Stacks

### 1. SecurityStack (`lib/security/security-stack.ts`)
**Propósito**: Gestión de certificados SSL y recursos de seguridad
- Certificados SSL para dominios personalizados
- Validación DNS automática
- Soporte para subdominios

**Recursos**:
- `Certificate`: Certificado SSL para `api.scrollprivate.work`

### 2. MonitoringStack (`lib/monitoring/monitoring-stack.ts`)
**Propósito**: Gestión de logging

**Recursos**:
- `LogGroup`: Para API Gateway (`/aws/apigateway/moviehome-scrolltv-{env}`)
- `LogGroup`: Para Lambda functions (`/aws/lambda/moviehome-scrolltv-{env}`)

### 3. LambdaLayerStack (`lib/lambda/lambda-layer-stack.ts`)
**Propósito**: Layers compartidos para funciones Lambda
- Dependencias comunes (pg, utils)
- Optimización de tamaño de funciones

### 4. LambdaRoleStack (`lib/lambda/lambda-role-stack.ts`)
**Propósito**: Roles y políticas IAM para Lambda
- Roles específicos por función
- Políticas granulares de permisos

### 5. LambdaFunctionStack (`lib/lambda/lambda-functions-stack.ts`)
**Propósito**: Funciones Lambda del negocio
- Todas las funciones de la aplicación
- Configuración de variables de entorno
- Integración con otros stacks

### 6. ApiGatewayStack (`lib/apigateway/apigateway-stack.ts`)
**Propósito**: API Gateway base y configuración de dominio
- REST API con CORS
- Dominio personalizado
- Deployment y stages
- Exports de RestApiId y RootResourceId

### 7. AuthApiMethodsStack (`lib/apigateway/auth-api-methods-stack.ts`)
**Propósito**: Endpoints de autenticación y administración de usuarios
- Endpoints de login (admin, user, platform)
- Gestión de usuarios administrativos
- Gestión de cuentas de usuario
- Gestión de plataformas y roles

### 8. ContentApiMethodsStack (`lib/apigateway/content-api-methods-stack.ts`)
**Propósito**: Endpoints de contenido multimedia
- Gestión de cast members y países
- Gestión de secciones y colecciones
- Gestión de categorías multimedia
- Gestión de películas, series, temporadas y episodios
- Firmas de video y top 10

### 9. CommerceApiMethodsStack (`lib/apigateway/commerce-api-methods-stack.ts`)
**Propósito**: Endpoints de comercio y facturación
- Gestión de tipos de paquetes
- Gestión de vendedores y usuarios de paquetes
- Gestión de recursos y créditos
- Gestión de revendedores

### 10. AppApiMethodsStack
**Propósito**: Endpoints de la aplicación
- Gestión de datos de la página de inicio

## Dependencias entre Stacks

```
SecurityStack (independiente)
MonitoringStack (independiente)
LambdaLayerStack (independiente)
    ↓
LambdaRoleStack → LambdaLayerStack
    ↓
LambdaFunctionStack → LambdaLayerStack, LambdaRoleStack
    ↓
ApiGatewayStack → SecurityStack, MonitoringStack
    ↓
AuthApiMethodsStack → ApiGatewayStack, LambdaFunctionStack
ContentApiMethodsStack → ApiGatewayStack, LambdaFunctionStack
CommerceApiMethodsStack → ApiGatewayStack, LambdaFunctionStack
AppApiMethodsStack → ApiGatewayStack, LambdaFunctionStack
```

## Configuración Centralizada

### `lib/config/stack-config.ts`
Archivo de configuración centralizada que define:
- Nombres de stacks estandarizados
- Configuración por ambiente
- Generación de props para stacks

## Variables de Contexto

El sistema soporta las siguientes variables de contexto:

```bash
# Ambiente (dev, staging, prod)
cdk deploy --context env=prod

# Email para alertas
cdk deploy --context alertEmail=admin@scrollprivate.work

# Cadena de conexión de base de datos
cdk deploy --context dbConnectionString="postgresql://user:pass@host:5432/db"
```

## Comandos de Despliegue

### Despliegue completo
```bash
npm run build
cdk deploy --all --context env=prod
```

### Despliegue por stack individual
```bash
# Solo seguridad
cdk deploy SecurityStack --context env=prod

# Solo monitoreo
cdk deploy MonitoringStack --context env=prod

# Solo layers de Lambda
cdk deploy LambdaLayerStack --context env=prod

# Solo roles de Lambda
cdk deploy LambdaRoleStack --context env=prod

# Solo funciones Lambda
cdk deploy LambdaFunctionStack --context env=prod

# Solo API Gateway base
cdk deploy ApiGatewayStack --context env=prod

# Solo endpoints de autenticación
cdk deploy AuthApiMethodsStack --context env=prod

# Solo endpoints de contenido
cdk deploy ContentApiMethodsStack --context env=prod

# Solo endpoints de comercio
cdk deploy CommerceApiMethodsStack --context env=prod
```

### Solo endpoints de la aplicación
```bash
cdk deploy AppApiMethodsStack --context env=prod
```

## Beneficios de la Arquitectura Modular

1. **Separación de Responsabilidades**: Cada stack tiene un propósito específico
2. **Despliegues Independientes**: Posibilidad de actualizar componentes por separado
3. **Reutilización**: Stacks como SecurityStack pueden reutilizarse en otros proyectos
4. **Mantenibilidad**: Código más organizado y fácil de mantener
5. **Escalabilidad**: Fácil agregar nuevos stacks o modificar existentes
6. **Testing**: Posibilidad de probar stacks de forma aislada
7. **Distribución de Recursos**: Evita límites de CloudFormation (500 recursos/stack)
8. **Despliegues Granulares**: Actualizar solo endpoints específicos sin afectar otros
9. **Organización por Contexto**: Endpoints agrupados por dominio de negocio

## Outputs y Referencias Cruzadas

Los stacks exponen recursos a través de propiedades públicas que son consumidas por otros stacks:

- `SecurityStack.certificate` → `ApiGatewayStack`
- `MonitoringStack.apiGatewayLogGroup` → `ApiGatewayStack`
- `LambdaLayerStack.layers` → `LambdaFunctionStack`
- `LambdaRoleStack.roles` → `LambdaFunctionStack`
- `ApiGatewayStack.restApiId` → `AuthApiMethodsStack`, `ContentApiMethodsStack`, `CommerceApiMethodsStack`, `AppApiMethodsStack`
- `ApiGatewayStack.restApiRootResourceId` → `AuthApiMethodsStack`, `ContentApiMethodsStack`, `CommerceApiMethodsStack`, `AppApiMethodsStack`
- `LambdaFunctionStack.functions` → `AuthApiMethodsStack`, `ContentApiMethodsStack`, `CommerceApiMethodsStack`, `AppApiMethodsStack`

## Tags Globales

Todos los recursos incluyen tags consistentes:
- `Project`: MovieHomeScrollTV
- `Environment`: dev/staging/prod
- `CreatedBy`: CDK
- `ManagedBy`: AWS-CDK
- `Component`: Específico por stack

## Historial de Cambios

### Eliminación del DatabaseStack (2024)
- **Motivo**: El `DatabaseStack` no estaba siendo utilizado activamente en el código
- **Recursos eliminados**:
  - Buckets S3 para multimedia y backups
  - Parámetros SSM para configuración de base de datos
- **Impacto**: Simplificación de la arquitectura, reducción de 7 a 6 stacks
- **Estado actual**: 6 stacks activos en producción