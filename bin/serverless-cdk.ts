#!/usr/bin/env node
import 'source-map-support/register';
import { App, CfnOutput, StackProps, Tags } from 'aws-cdk-lib';
import { LambdaLayerStack } from '../lib/lambda/lambda-layer-stack';
import { LambdaRoleStack } from '../lib/lambda/lambda-role-stack';
import { LambdaFunctionStack } from '../lib/lambda/lambda-functions-stack';
import { ApiGatewayStack } from '../lib/apigateway/apigateway-stack';

const app = new App();

// Obtener configuración del contexto
const environment = app.node.tryGetContext('env') || 'dev'; 

// Set the variables for stackName
const COID = 'moviehome';
const ASSETID = '0001';
const APID = 'scrolltv';
const SID = 'dev';

//const dbName = app.node.tryGetContext(environment).dbName;  // Obtener el nombre de la base de datos

const generateStackProps = (suffix: string): StackProps => {
  return {
    env: environment,
    stackName: `${COID}-${ASSETID}-${APID}-${SID}-${suffix}`,
  };
};


// Crear el Layer para las Lambdas
const lambdaLayerStack = new LambdaLayerStack(app, 'LambdaLayerStack', generateStackProps('lambda-role-stack'));

// Crear los Roles para los lambdas
const lambdaRoleStack = new LambdaRoleStack(app, 'LambdaRoleStack', generateStackProps('lambda-layer-stack'));

// Crear las funciones para el Stack
const lambdaFunctionStack = new LambdaFunctionStack(app, 'LambdaFunctionStack', {
  ...generateStackProps('lambda-function-stack'),
  lambdaRoles: lambdaRoleStack.roles,
  layerStack: lambdaLayerStack
});

// Crear el API Gateway y asociar las Lambdas
const apiGatewayStack = new ApiGatewayStack(app, 'ApiGatewayStack', {
  ...generateStackProps('api-gateway-stack'),
  environmentStack: environment,
});

lambdaRoleStack.addDependency(lambdaLayerStack); 
//lambdaFunctionStack.addDependency(apiGatewayStack);
lambdaFunctionStack.addDependency(lambdaLayerStack);
lambdaFunctionStack.addDependency(lambdaRoleStack);

apiGatewayStack.addDependency(lambdaFunctionStack);

app.synth();


//const env = {
//  account: process.env.CDK_DEFAULT_ACCOUNT,
// region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
//};

//const stackPrefix = `MovieHomeScrollTV-${stage}`;

// 1. Stack de Layers (debe ser el primero)
//const lambdaLayerStack = new LambdaLayerStack(app, `${stackPrefix}-LambdaLayerStack`, {
//  env,
//  stackName: `${stackPrefix}-LambdaLayerStack`,
//  description: 'Stack de Lambda Layers para MovieHome ScrollTV',
//});

// 2. Stack de Roles IAM
//const lambdaRoleStack = new LambdaRoleStack(app, `${stackPrefix}-LambdaRoleStack`, {
//  env,
//  stackName: `${stackPrefix}-LambdaRoleStack`,
//  description: 'Stack de Roles IAM para Lambda Functions',
//});

// 3. Stack de Lambda Functions
//const lambdaFunctionStack = new LambdaFunctionStack(app, `${stackPrefix}-LambdaFunctionStack`, {
//  env,
//  stackName: `${stackPrefix}-LambdaFunctionStack`,
//  description: 'Stack de Lambda Functions para MovieHome ScrollTV',
//  layerStack: lambdaLayerStack,
//  lambdaRoles: lambdaRoleStack.roles,
//});

// 4. Stack de API Gateway (debe ser el último)
//const apiGatewayStack = new ApiGatewayStack(app, `${stackPrefix}-ApiGatewayStack`, {
//  env,
//  stackName: `${stackPrefix}-ApiGatewayStack`,
//  description: 'Stack de API Gateway para MovieHome ScrollTV',
//  stage,
//  environment,
//});

// Dependencias entre stacks
//lambdaFunctionStack.addDependency(lambdaLayerStack);
//lambdaFunctionStack.addDependency(lambdaRoleStack);
//apiGatewayStack.addDependency(lambdaFunctionStack);

// cfn output
//new CfnOutput(app, 'ApiGatewayUrl', {
//  value: apiGatewayStack.api.url,
//  description: 'URL del API Gateway',
//});

// Tags globales
//Tags.of(app).add('Project', 'MovieHomeScrollTV');
//Tags.of(app).add('Environment', environment);
//Tags.of(app).add('CreatedBy', 'CDK'); 