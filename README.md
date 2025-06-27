# Backend CDK Serverless MovieHome ScrollTV

Backend serverless para la aplicación MovieHome ScrollTV, construido con AWS CDK y TypeScript siguiendo arquitectura limpia.

## 🏗️ Arquitectura

Este proyecto implementa una arquitectura serverless moderna utilizando:

- **AWS CDK** para infraestructura como código
- **API Gateway** para endpoints REST
- **Lambda Functions** con patrón handler → service → repository → dto
- **Lambda Layers** para código reutilizable
- **PostgreSQL** como base de datos principal
- **SSM Parameter Store** para configuración
- **TypeScript** en toda la aplicación

## 📁 Estructura del Proyecto

```
backend-cdk-serverless-moviehome-scrolltv/
├── bin/
│   └── serverless-cdk.ts                    # Punto de entrada del CDK
├── lib/
│   ├── apigateway/
│   │   ├── add-api-methods.ts               # Helper para rutas de API
│   │   └── apigateway-stack.ts              # Stack de API Gateway
│   └── lambda/
│       ├── src/functions/                   # Funciones Lambda
│       │   └── getBillingDetail/
│       │       ├── handler.ts               # Handler principal
│       │       ├── services/                # Lógica de negocio
│       │       ├── repositories/            # Acceso a datos
│       │       └── dtos/                    # DTOs y tipos
│       ├── layers/                          # Lambda Layers
│       │   ├── pg/nodejs/                   # Layer PostgreSQL
│       │   └── utils/nodejs/                # Layer utilidades
│       ├── roles/                           # Configuración IAM
│       ├── helpers/                         # Helpers CDK
│       ├── functions-template-lambda.ts     # Plantillas de funciones
│       ├── lambda-functions-stack.ts        # Stack de funciones
│       ├── lambda-layer-stack.ts            # Stack de layers
│       └── lambda-role-stack.ts             # Stack de roles
├── package.json
├── tsconfig.json
├── cdk.json
└── README.md
```

## 🚀 Funciones Lambda Disponibles

### 1. GetBillingDetail
- **Endpoint**: `GET /billing/detail?billId={id}`
- **Descripción**: Obtiene el detalle de facturación por ID
- **Parámetros**: `billId` (requerido)

### 2. GetMovies
- **Endpoint**: `GET /movies?page={page}&limit={limit}&genre={genre}&search={search}`
- **Descripción**: Lista películas con filtros y paginación
- **Parámetros**: `page`, `limit`, `genre`, `search` (opcionales)

### 3. GetMovieDetail
- **Endpoint**: `GET /movies/{id}`
- **Descripción**: Obtiene el detalle de una película específica
- **Parámetros**: `id` (requerido en path)

### 4. CreateUser
- **Endpoint**: `POST /users`
- **Descripción**: Crea un nuevo usuario
- **Body**: JSON con datos del usuario

### 5. AuthUser
- **Endpoint**: `POST /auth`
- **Descripción**: Autentica un usuario
- **Body**: JSON con credenciales

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- AWS CLI configurado
- CDK CLI: `npm install -g aws-cdk`

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd backend-cdk-serverless-moviehome-scrolltv

# Instalar dependencias
npm install

# Configurar CDK (primera vez)
cdk bootstrap
```

### Configuración de Variables

Configurar los siguientes parámetros en AWS SSM Parameter Store:

```bash
# Configuración de base de datos
/moviehome-scrolltv/db/host
/moviehome-scrolltv/db/port
/moviehome-scrolltv/db/database
/moviehome-scrolltv/db/user
/moviehome-scrolltv/db/password (SecureString)
```

## 🚀 Despliegue

### Desarrollo
```bash
# Compilar el proyecto
npm run build

# Visualizar cambios
npm run diff

# Desplegar a desarrollo
cdk deploy --all --context stage=dev
```

### Producción
```bash
# Desplegar a producción
cdk deploy --all --context stage=prod
```

## 📋 Scripts Disponibles

```bash
npm run build          # Compilar TypeScript
npm run watch          # Compilar en modo watch
npm run test           # Ejecutar tests
npm run cdk            # Comandos CDK
npm run deploy         # Desplegar todos los stacks
npm run destroy        # Destruir todos los stacks
npm run synth          # Generar CloudFormation
npm run diff           # Ver diferencias
```

## 🏛️ Stacks de CDK

### 1. LambdaLayerStack
Crea los layers reutilizables:
- **PgLayer**: PostgreSQL y AWS SDK
- **UtilsLayer**: Utilidades comunes

### 2. LambdaRoleStack
Crea los roles IAM para cada función Lambda con permisos específicos.

### 3. LambdaFunctionsStack
Despliega todas las funciones Lambda con su configuración optimizada.

### 4. ApiGatewayStack
Configura API Gateway con todas las rutas y métodos, incluyendo CORS.

## 🔒 Seguridad

- Roles IAM con principio de menor privilegio
- Parámetros sensibles en SSM Parameter Store (encriptados)
- CORS configurado correctamente
- X-Ray tracing habilitado
- Logs estructurados en CloudWatch

## 📊 Monitoreo

- CloudWatch Logs para todas las funciones
- X-Ray tracing habilitado
- Métricas de API Gateway
- Alarmas de CloudWatch (configurar según necesidades)

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm test

# Test de una función específica
npm test -- --testNamePattern="getBillingDetail"
```

## 📈 Escalabilidad

- Funciones Lambda con auto-scaling
- Connection pooling en PostgreSQL
- Cache en capas superiores (implementar según necesidades)
- API Gateway con throttling configurado

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Para reportar bugs o solicitar features, crear un issue en el repositorio.

---

**Desarrollado por el equipo de MovieHome ScrollTV** 🎬 

# Table of Contents
- [Table of Contents](#table-of-contents)
  - [Welcome to your CDK TypeScript project](#welcome-to-your-cdk-typescript-project)
  - [Useful commands](#useful-commands)
  - [On Boarding](#on-boarding)
  - [How to add a new layer for the functions](#how-to-add-a-new-layer-for-the-functions)
  - [How to add a role for the function](#how-to-add-a-role-for-the-function)
  - [How to add a new function](#how-to-add-a-new-function)
    - [Create the function tempplate](#create-the-function-tempplate)
    - [Add the function template to the Stack](#add-the-function-template-to-the-stack)
    - [Now its time to add some Code](#now-its-time-to-add-some-code)
    - [Set the Secret values to our Function](#set-the-secret-values-to-our-function)
  - [Run the all cdk project](#run-the-all-cdk-project)
  - [Userfull Commands](#userfull-commands)
  - [📦 Estrategia de Deploy Sin Rollback](#-estrategia-de-deploy-sin-rollback)
    - [🔧 Comandos para Deploy Incremental](#-comandos-para-deploy-incremental)
    - [🎯 Estrategias Específicas](#-estrategias-específicas)

## Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
* `npm run clean`   Clear the generated folder cdk.out

## On Boarding
This project launch the base architecture for serverless app, using the next stacks:
- **`lib/lambda/lambda-layer-stack.ts`**       Stack to put the layers to use in different functions
- **`lib/lambda/lambda-role-stack.ts`**       Stack to put the roles to use in different functions
- **`lib/lambda/lambda-functions-stack.ts`**       Stack to save the code to use in different functions
- **`lib/apigateway/apigateway-stack.ts`**       Stack to save the functions in the same apigateway

## How to add a new layer for the functions
To add a new layer to add to our project we can use a different layer. For example we have the library **`pg`** (client for postgresql). 

First step, we have to go to the folder **`lib/lambda/layers`**, here you can create the new folder for the layer like 'pg', inside this folder we have to create a folder with the name **`nodejs`**. This name is not a variable, always is called **`nodejs`** for the package layer. Then inside the project you have to run the next commands:

```sh
cd lib/lambda/layers/pg
npm init -y
```
Here you have already a project npm, then you have to add the library like a common project.
```sh
npm i pg
```
then you have created already a project with package.json with the new dependency pg, now you have to back to previous folder pg

```sh
cd .. 
```
now you have to zip the folder nodejs using the next command:
```sh
zip -r nodejs.zip nodejs/
```
Now you have to move the zip folder to the folder build 
```sh
mv nodejs.zip build/pg.zip
```

This is manual form but we have the script build-layers.ps1 (for windows) or build-layers.sh (for linux) to execute this automatically.

If you create the build of layers you can execute the command:
```sh
npm run build:layers
```

This will create all layers in the folder build inside folder layers (layers/build/), then you have to config the layer in the file **`lib/lambda/lambda-layer-stack.ts`** for to add the layer and use it for lambda functions.

Once you add the new layer config in the file lambda-layer-stack.ts, you run the next command
```sh
npm run deploy
```

## How to add a role for the function
This step you have to create a role to put specific permissions for the function that you're going to create. We can go to the file **`lib/lambda/roles/lambda-roles.ts`** and create a new role following the pattern we have there.

For example we have this role:
```javascript
adminLoginLambdaRole: this.createRole('AdminLoginLambdaRole', 'Rol para función de login de administradores', [
  policies.CloudWatchLogsPolicy,
  policies.SSMReadAccessPolicy,
  policies.SecretsManagerPolicy
])
```

Once you add the new role config in the file lambda-roles.ts, you run the next command
```sh
npm run deploy
```

## How to add a new function

### Create the function tempplate

Create the function template in **`lib/lambda/functions-template-lambda.ts`** with the pattern that we have 

```javascript
  // AdminLogin Function
  const adminLoginFunction = new NodejsFunction(props.scope, 'AdminLoginFunction', {
    functionName: 'AdminLoginFunction',
    entry: 'lib/lambda/src/functions/adminLogin/handler.ts',
    handler: 'handler',
    runtime: props.layers.pgLayer.compatibleRuntimes[0],
    layers: [props.layers.utilsLayer, props.layers.pgLayer],
    role: props.roles.adminLoginLambdaRole,
    environment: {
      NODE_ENV: 'production'
    },
    timeout: Duration.seconds(30),
    memorySize: 256,
    bundling: {
      externalModules: [],
      target: 'node20'
    }
  });
```

### Add the function template to the Stack
add the function template to the stack **`lib/lambda/lambda-functions-stack.ts`** with the pattern that we have 

```javascript
    // Crear función AdminLogin
    const adminLoginTemplate = createAdminLoginLambdaTemplate({
      scope: this,
      layers: {
        utilsLayer,
        pgLayer
      },
      roles: {
        adminLoginLambdaRole
      }
    });
```

also you have to create a parameter to store the function arn in SSM Parameter store:

```javascript
// Crear parámetro SSM para AdminLoginFunction
new StringParameter(this, 'AdminLoginFunctionArnParameter', {
  parameterName: '/moviehome-scrolltv/admin-login-function-arn',
  stringValue: adminLoginTemplate.functionArn,
  description: 'ARN de la función Lambda AdminLogin'
});
```

### Now its time to add some Code
at this point we need to add some business logic to the folder **`lib/lambda/src/functions/`**, following the pattern that we have with adminLogin function. If we follow the pattern we have:

```sh
lib/lambda/src/functions/{FUNCTION_NAME}/
├── dtos/
│   └── {FUNCTION_NAME}.dto.ts
├── repositories/
│   └── {FUNCTION_NAME}.repo.ts  
├── services/
│   └── {FUNCTION_NAME}.service.ts
└── handler.ts
```

**handler.ts**: es el punto de entrada de la función Lambda. Maneja la request HTTP, valida los datos de entrada, llama al servicio y retorna la respuesta.

**dtos**: contiene las interfaces y validaciones de los objetos de transferencia de datos (Request/Response DTOs).

**services**: contiene la lógica de negocio principal de la función.

**repositories**: maneja las operaciones de base de datos específicas para esta función.

### Set the Secret values to our Function

you need to set some environment variables in the secrets manager to allow the lambda function can connect to the database and other AWS services. 

We use the secret path **/serverless-app/db/secret** (This was configured in the function). in secrets manager you have to create a secret with this format:

```json
{
  "database": {
    "host": "your-db-host",
    "port": 5432,
    "database": "your-db-name", 
    "user": "your-db-user",
    "password": "your-db-password",
    "ssl": true
  },
  "cognito": {
    "userPoolId": "us-east-1_XXXXXXXXX",
    "clientId": "XXXXXXXXXXXXXXXXXXXXXXXXXX",
    "region": "us-east-1"
  },
  "environment": "dev"
}
```

## Run the all cdk project
```sh
npm run deploy
```

## Userfull Commands

* `npm run deploy` - Despliega todos los stacks
* `npm run destroy` - Elimina todos los stacks  
* `npm run build:layers` - Construye las capas Lambda
* `npm run synth` - Genera plantillas CloudFormation
* `npm run diff` - Muestra diferencias con el stack desplegado

## 📦 Estrategia de Deploy Sin Rollback

### 🔧 Comandos para Deploy Incremental

#### ✅ **Para Múltiples Lambdas - EVITA ROLLBACKS**

```bash
# 1. Actualizar solo las capas (con versionado automático)
npm run update:layers

# 2. Actualizar solo las funciones Lambda (usa nuevas capas)
npm run deploy:functions  

# 3. Actualizar solo el API Gateway
npm run deploy:api

# 4. Deploy incremental completo (sin tocar roles)
npm run deploy:incremental
```

#### 🛡️ **Deploy Seguro (Incluye roles)**
```bash
npm run deploy:safe
```

#### ⚡ **Deploy Específico por Stack**
```bash
npm run deploy:layers     # Solo capas
npm run deploy:functions  # Solo funciones Lambda
npm run deploy:roles      # Solo roles IAM
npm run deploy:api        # Solo API Gateway
```

### 🎯 Estrategias Específicas

#### **Escenario 1: Cambio en Código de Lambda**
```bash
# ✅ Solo redeploy de funciones (rápido)
npm run deploy:functions
```

#### **Escenario 2: Cambio en Capas (utils, pg, etc.)**
```bash
# ✅ Versionado automático evita conflictos
npm run update:layers
npm run deploy:functions  # Actualiza funciones para usar nuevas capas
```

#### **Escenario 3: Nuevo Endpoint en API Gateway**
```bash
# ✅ Solo API Gateway
npm run deploy:api
```

#### **Escenario 4: Nueva Lambda Function**
```bash
# ✅ Deploy incremental
npm run deploy:incremental
```

### 🔥 **Características del Versionado Automático**

- **Hash MD5**: Las capas se versionan automáticamente basado en su contenido
- **Sin Conflictos**: Cada cambio crea una nueva versión de la capa
- **Referencias Estables**: Las funciones Lambda se actualizan automáticamente
- **Rollback Seguro**: Versiones anteriores permanecen disponibles

### ⚠️ **Cuándo SÍ Hacer Destroy/Deploy**

Solo cuando cambies:
- Estructura fundamental de stacks
- Configuración de CDK
- Dependencias entre stacks 