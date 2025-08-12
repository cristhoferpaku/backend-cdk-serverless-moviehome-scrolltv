#!/usr/bin/env node
import 'source-map-support/register';
import { App, Tags } from 'aws-cdk-lib';
import { getStackConfig, generateStackProps, STACK_NAMES } from '../lib/config/stack-config';

// Importar todos los stacks
import { SecurityStack } from '../lib/security/security-stack';
import { MonitoringStack } from '../lib/monitoring/monitoring-stack';

import { LambdaLayerStack } from '../lib/lambda/lambda-layer-stack';
import { LambdaRoleStack } from '../lib/lambda/lambda-role-stack';
import { LambdaFunctionStack } from '../lib/lambda/lambda-functions-stack';
import { ApiGatewayStack } from '../lib/apigateway/apigateway-stack';

const app = new App();

// Obtener configuración del contexto
const environment = app.node.tryGetContext('env') || 'dev';
const alertEmail = app.node.tryGetContext('alertEmail');
const dbConnectionString = app.node.tryGetContext('dbConnectionString');

// Obtener configuración centralizada
const config = getStackConfig(environment);

// 1. Stack de Seguridad (Certificados SSL)
const securityStack = new SecurityStack(app, 'SecurityStack', {
  ...generateStackProps(config, STACK_NAMES.SECURITY),
  domainName: config.domainName,
});

// 2. Stack de Monitoreo (Logs y Alertas)
const monitoringStack = new MonitoringStack(app, 'MonitoringStack', {
  ...generateStackProps(config, STACK_NAMES.MONITORING),
  environment: config.environment,
});



// 4. Stack de Lambda Layers
const lambdaLayerStack = new LambdaLayerStack(app, 'LambdaLayerStack', {
  ...generateStackProps(config, STACK_NAMES.LAMBDA_LAYER),
});

// 5. Stack de Roles IAM para Lambdas
const lambdaRoleStack = new LambdaRoleStack(app, 'LambdaRoleStack', {
  ...generateStackProps(config, STACK_NAMES.LAMBDA_ROLES),
});

// 6. Stack de Funciones Lambda
const lambdaFunctionStack = new LambdaFunctionStack(app, 'LambdaFunctionStack', {
  ...generateStackProps(config, STACK_NAMES.LAMBDA_FUNCTIONS),
  lambdaRoles: lambdaRoleStack.roles,
  layerStack: lambdaLayerStack,
});

// 7. Stack de API Gateway
const apiGatewayStack = new ApiGatewayStack(app, 'ApiGatewayStack', {
  ...generateStackProps(config, STACK_NAMES.API_GATEWAY),
  environment: config.environment,
  domainName: config.domainName,
  certificate: securityStack.certificate,
  logGroup: monitoringStack.apiGatewayLogGroup,
  lambdaFunctions: {
    adminLoginFunction: lambdaFunctionStack.adminLoginFunction,
    refreshTokenFunction: lambdaFunctionStack.refreshTokenFunction,
    listUserAdminsFunction: lambdaFunctionStack.listUserAdminsFunction,
    createUserAdminFunction: lambdaFunctionStack.createUserAdminFunction,
    getUserAdminByIdFunction: lambdaFunctionStack.getUserAdminByIdFunction,
    updateUserAdminFunction: lambdaFunctionStack.updateUserAdminFunction,
    deleteUserAdminFunction: lambdaFunctionStack.deleteUserAdminFunction,
    changeUserAdminStatusFunction: lambdaFunctionStack.changeUserAdminStatusFunction,
    getPlatformsFunction: lambdaFunctionStack.getPlatformsFunction,
    getRolesFunction: lambdaFunctionStack.getRolesFunction,
    createPackageSellerFunction: lambdaFunctionStack.createPackageSellerFunction,
    createPackageTypeFunction: lambdaFunctionStack.createPackageTypeFunction,
    listPackageTypesFunction: lambdaFunctionStack.listPackageTypesFunction,
    getPackageTypeByIdFunction: lambdaFunctionStack.getPackageTypeByIdFunction,
    deletePackageTypeFunction: lambdaFunctionStack.deletePackageTypeFunction,
    updatePackageTypeFunction: lambdaFunctionStack.updatePackageTypeFunction,
    changePackageTypeStatusFunction: lambdaFunctionStack.changePackageTypeStatusFunction,
    listPackageSellerFunction: lambdaFunctionStack.listPackageSellerFunction,
    getPackageSellerByIdFunction: lambdaFunctionStack.getPackageSellerByIdFunction,
    updatePackageSellerFunction: lambdaFunctionStack.updatePackageSellerFunction,
    deletePackageSellerFunction: lambdaFunctionStack.deletePackageSellerFunction,
    changePackageSellerStatusFunction: lambdaFunctionStack.changePackageSellerStatusFunction,
    createPackageUserFunction: lambdaFunctionStack.createPackageUserFunction,
    getPackageUserByIdFunction: lambdaFunctionStack.getPackageUserByIdFunction,
    listPackageUsersFunction: lambdaFunctionStack.listPackageUsersFunction,
    updatePackageUserFunction: lambdaFunctionStack.updatePackageUserFunction,
    deletePackageUserFunction: lambdaFunctionStack.deletePackageUserFunction,
    changePackageUserStatusFunction: lambdaFunctionStack.changePackageUserStatusFunction,
    listPackageTypesActiveFunction: lambdaFunctionStack.listPackageTypesActiveFunction,
    createUserAccountFunction: lambdaFunctionStack.createUserAccountFunction,
    getUserAccountByIdFunction: lambdaFunctionStack.getUserAccountByIdFunction,
    listUserAccountsFunction: lambdaFunctionStack.listUserAccountsFunction,
    updateUserAccountFunction: lambdaFunctionStack.updateUserAccountFunction,
    deleteUserAccountFunction: lambdaFunctionStack.deleteUserAccountFunction,
    changeUserAccountStatusFunction: lambdaFunctionStack.changeUserAccountStatusFunction,
    listUserAccountByAdminFunction: lambdaFunctionStack.listUserAccountByAdminFunction,
    assignSellerCreditFunction: lambdaFunctionStack.assignSellerCreditFunction,
    createResourceFunction: lambdaFunctionStack.createResourceFunction,
    listResourceFunction: lambdaFunctionStack.listResourceFunction,
    getResourceByIdFunction: lambdaFunctionStack.getResourceByIdFunction,
    changeResourceStateFunction: lambdaFunctionStack.changeResourceStateFunction,
    deleteResourceFunction: lambdaFunctionStack.deleteResourceFunction,
    updateResourceFunction: lambdaFunctionStack.updateResourceFunction,
    getSellerCreditByIdFunction: lambdaFunctionStack.getSellerCreditByIdFunction,
    listCastMembersFunction: lambdaFunctionStack.listCastMembersFunction,
    getCastMemberByIdFunction: lambdaFunctionStack.getCastMemberByIdFunction,
    createCastMemberFunction: lambdaFunctionStack.createCastMemberFunction,
    updateCastMemberFunction: lambdaFunctionStack.updateCastMemberFunction,
    deleteCastMemberFunction: lambdaFunctionStack.deleteCastMemberFunction,
    listAllCountriesFunction: lambdaFunctionStack.listAllCountriesFunction,
    getAllSectionsFunction: lambdaFunctionStack.getAllSectionsFunction,
    listCollectionsFunction: lambdaFunctionStack.listCollectionsFunction,
    getCollectionByIdFunction: lambdaFunctionStack.getCollectionByIdFunction,
    createCollectionFunction: lambdaFunctionStack.createCollectionFunction,
    updateCollectionFunction: lambdaFunctionStack.updateCollectionFunction,
    deleteCollectionFunction: lambdaFunctionStack.deleteCollectionFunction,
    changeCollectionStatusFunction: lambdaFunctionStack.changeCollectionStatusFunction,
    getAllCollectionsFunction: lambdaFunctionStack.getAllCollectionsFunction,
    listMultimediaCategoriesFunction: lambdaFunctionStack.listMultimediaCategoriesFunction,
    getMultimediaCategoryByIdFunction: lambdaFunctionStack.getMultimediaCategoryByIdFunction,
    createMultimediaCategoryFunction: lambdaFunctionStack.createMultimediaCategoryFunction,
    updateMultimediaCategoryFunction: lambdaFunctionStack.updateMultimediaCategoryFunction,
    deleteMultimediaCategoryFunction: lambdaFunctionStack.deleteMultimediaCategoryFunction,
    changeMultimediaCategoryStatusFunction: lambdaFunctionStack.changeMultimediaCategoryStatusFunction,
    getAllMultimediaCategoriesFunction: lambdaFunctionStack.getAllMultimediaCategoriesFunction,
    createMovieFunction: lambdaFunctionStack.createMovieFunction,
    getMovieByIdFunction: lambdaFunctionStack.getMovieByIdFunction,
    deleteMovieFunction: lambdaFunctionStack.deleteMovieFunction,
    changeMovieStatusFunction: lambdaFunctionStack.changeMovieStatusFunction,
    updateMovieFunction: lambdaFunctionStack.updateMovieFunction,
    createSeriesFunction: lambdaFunctionStack.createSeriesFunction,
    getSeriesByIdFunction: lambdaFunctionStack.getSeriesByIdFunction,
    deleteSeriesFunction: lambdaFunctionStack.deleteSeriesFunction,
    changeSeriesStatusFunction: lambdaFunctionStack.changeSeriesStatusFunction,
    updateSeriesFunction: lambdaFunctionStack.updateSeriesFunction,
    listMultimediaFunction: lambdaFunctionStack.listMultimediaFunction,
    createSeasonFunction: lambdaFunctionStack.createSeasonFunction,
    getSeasonByIdFunction: lambdaFunctionStack.getSeasonByIdFunction,
    listSeasonsFunction: lambdaFunctionStack.listSeasonsFunction,
    deleteSeasonFunction: lambdaFunctionStack.deleteSeasonFunction,
    updateSeasonFunction: lambdaFunctionStack.updateSeasonFunction,
    createEpisodeFunction: lambdaFunctionStack.createEpisodeFunction,
    getEpisodeByIdFunction: lambdaFunctionStack.getEpisodeByIdFunction,
    listEpisodesFunction: lambdaFunctionStack.listEpisodesFunction,
    deleteEpisodeFunction: lambdaFunctionStack.deleteEpisodeFunction,
    updateEpisodeFunction: lambdaFunctionStack.updateEpisodeFunction,
    getVideoSignatureFunction: lambdaFunctionStack.getVideoSignatureFunction,
    listTop10Function: lambdaFunctionStack.listTop10Function,
    createTop10Function: lambdaFunctionStack.createTop10Function,
    deleteTop10Function: lambdaFunctionStack.deleteTop10Function,
    createRevendedorFunction: lambdaFunctionStack.createRevendedorFunction,
    listRevendedoresFunction: lambdaFunctionStack.listRevendedoresFunction,
    transferirCreditosFunction: lambdaFunctionStack.transferirCreditosFunction,
    clientLoginFunction: lambdaFunctionStack.clientLoginFunction,
  },
});

// Configurar dependencias entre stacks
lambdaRoleStack.addDependency(lambdaLayerStack);
lambdaFunctionStack.addDependency(lambdaLayerStack);
lambdaFunctionStack.addDependency(lambdaRoleStack);

apiGatewayStack.addDependency(lambdaFunctionStack);
apiGatewayStack.addDependency(securityStack); // Para el certificado SSL
apiGatewayStack.addDependency(monitoringStack); // Para los logs

// Tags globales para toda la aplicación
Tags.of(app).add('Project', 'MovieHomeScrollTV');
Tags.of(app).add('Environment', config.environment);
Tags.of(app).add('CreatedBy', 'CDK');
Tags.of(app).add('ManagedBy', 'AWS-CDK');

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