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
import { AuthApiMethodsStack } from '../lib/apigateway/auth-api-methods-stack';
import { ContentApiMethodsStack } from '../lib/apigateway/content-api-methods-stack';
import { CommerceApiMethodsStack } from '../lib/apigateway/commerce-api-methods-stack';
import { AppApiMethodsStack } from '../lib/apigateway/app-api-methods-stack';


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

// 7. Stack de API Gateway (simplificado)
const apiGatewayStack = new ApiGatewayStack(app, 'ApiGatewayStack', {
  ...generateStackProps(config, STACK_NAMES.API_GATEWAY),
  environment: config.environment,
  domainName: config.domainName,
  certificate: securityStack.certificate,
  logGroup: monitoringStack.apiGatewayLogGroup,
});

// 8. Stack de métodos de API de autenticación
const authApiMethodsStack = new AuthApiMethodsStack(app, 'AuthApiMethodsStack', {
  ...generateStackProps(config, STACK_NAMES.AUTH_API_METHODS),
  environment: config.environment,
  restApiId: apiGatewayStack.restApiId,
  restApiRootResourceId: apiGatewayStack.restApiRootResourceId,
  // Auth Lambda Functions
  adminLoginFunction: lambdaFunctionStack.adminLoginFunction,
  clientLoginFunction: lambdaFunctionStack.clientLoginFunction,
  refreshTokenFunction: lambdaFunctionStack.refreshTokenFunction,
  // User Admin Functions
  listUserAdminsFunction: lambdaFunctionStack.listUserAdminsFunction,
  createUserAdminFunction: lambdaFunctionStack.createUserAdminFunction,
  getUserAdminByIdFunction: lambdaFunctionStack.getUserAdminByIdFunction,
  updateUserAdminFunction: lambdaFunctionStack.updateUserAdminFunction,
  deleteUserAdminFunction: lambdaFunctionStack.deleteUserAdminFunction,
  changeUserAdminStatusFunction: lambdaFunctionStack.changeUserAdminStatusFunction,

  // User Account Functions
  getUserAccountByIdFunction: lambdaFunctionStack.getUserAccountByIdFunction,
  listUserAccountsFunction: lambdaFunctionStack.listUserAccountsFunction,
  listUserAccountByAdminFunction: lambdaFunctionStack.listUserAccountByAdminFunction,
  createUserAccountFunction: lambdaFunctionStack.createUserAccountFunction,
  updateUserAccountFunction: lambdaFunctionStack.updateUserAccountFunction,
  deleteUserAccountFunction: lambdaFunctionStack.deleteUserAccountFunction,
  changeUserAccountStatusFunction: lambdaFunctionStack.changeUserAccountStatusFunction,
  // Platform Functions
  getPlatformsFunction: lambdaFunctionStack.getPlatformsFunction,
  // Role Functions
  getRolesFunction: lambdaFunctionStack.getRolesFunction,
});

// 9. Stack de métodos de API de contenido
const contentApiMethodsStack = new ContentApiMethodsStack(app, 'ContentApiMethodsStack', {
  ...generateStackProps(config, STACK_NAMES.CONTENT_API_METHODS),
  environment: config.environment,
  restApiId: apiGatewayStack.restApiId,
  restApiRootResourceId: apiGatewayStack.restApiRootResourceId,
  // Cast Member Functions
  createCastMemberFunction: lambdaFunctionStack.createCastMemberFunction,
  getCastMemberByIdFunction: lambdaFunctionStack.getCastMemberByIdFunction,
  updateCastMemberFunction: lambdaFunctionStack.updateCastMemberFunction,
  deleteCastMemberFunction: lambdaFunctionStack.deleteCastMemberFunction,
  listCastMembersFunction: lambdaFunctionStack.listCastMembersFunction,
  // Country Functions
  createCountryFunction: lambdaFunctionStack.listAllCountriesFunction,
  getCountryFunction: lambdaFunctionStack.listAllCountriesFunction,
  updateCountryFunction: lambdaFunctionStack.listAllCountriesFunction,
  deleteCountryFunction: lambdaFunctionStack.listAllCountriesFunction,
  listCountriesFunction: lambdaFunctionStack.listAllCountriesFunction,
  // Section Functions
  createSectionFunction: lambdaFunctionStack.getAllSectionsFunction,
  getSectionFunction: lambdaFunctionStack.getAllSectionsFunction,
  updateSectionFunction: lambdaFunctionStack.getAllSectionsFunction,
  deleteSectionFunction: lambdaFunctionStack.getAllSectionsFunction,
  listSectionsFunction: lambdaFunctionStack.getAllSectionsFunction,
  // Collection Functions
  createCollectionFunction: lambdaFunctionStack.createCollectionFunction,
  getCollectionByIdFunction: lambdaFunctionStack.getCollectionByIdFunction,
  updateCollectionFunction: lambdaFunctionStack.updateCollectionFunction,
  deleteCollectionFunction: lambdaFunctionStack.deleteCollectionFunction,
  listCollectionsFunction: lambdaFunctionStack.listCollectionsFunction,
  changeCollectionStatusFunction: lambdaFunctionStack.changeCollectionStatusFunction,
  getAllCollectionsFunction: lambdaFunctionStack.getAllCollectionsFunction,
  // Multimedia Category Functions
  createMultimediaCategoryFunction: lambdaFunctionStack.createMultimediaCategoryFunction,
  getMultimediaCategoryByIdFunction: lambdaFunctionStack.getMultimediaCategoryByIdFunction,
  updateMultimediaCategoryFunction: lambdaFunctionStack.updateMultimediaCategoryFunction,
  deleteMultimediaCategoryFunction: lambdaFunctionStack.deleteMultimediaCategoryFunction,
  listMultimediaCategoriesFunction: lambdaFunctionStack.listMultimediaCategoriesFunction,
  changeMultimediaCategoryStatusFunction: lambdaFunctionStack.changeMultimediaCategoryStatusFunction,
  getAllMultimediaCategoriesFunction: lambdaFunctionStack.getAllMultimediaCategoriesFunction,

  // Movie Functions
  createMovieFunction: lambdaFunctionStack.createMovieFunction,
  getMovieByIdFunction: lambdaFunctionStack.getMovieByIdFunction,
  updateMovieFunction: lambdaFunctionStack.updateMovieFunction,
  deleteMovieFunction: lambdaFunctionStack.deleteMovieFunction,
  changeMovieStatusFunction: lambdaFunctionStack.changeMovieStatusFunction,
  // Series Functions
  createSeriesFunction: lambdaFunctionStack.createSeriesFunction,
  getSeriesByIdFunction: lambdaFunctionStack.getSeriesByIdFunction,
  updateSeriesFunction: lambdaFunctionStack.updateSeriesFunction,
  deleteSeriesFunction: lambdaFunctionStack.deleteSeriesFunction,
  changeSeriesStatusFunction: lambdaFunctionStack.changeSeriesStatusFunction,
  // Multimedia Functions
  listMultimediaFunction: lambdaFunctionStack.listMultimediaFunction,
  // Season Functions
  createSeasonFunction: lambdaFunctionStack.createSeasonFunction,
  getSeasonByIdFunction: lambdaFunctionStack.getSeasonByIdFunction,
  updateSeasonFunction: lambdaFunctionStack.updateSeasonFunction,
  deleteSeasonFunction: lambdaFunctionStack.deleteSeasonFunction,
  listSeasonsFunction: lambdaFunctionStack.listSeasonsFunction,
  // Episode Functions
  createEpisodeFunction: lambdaFunctionStack.createEpisodeFunction,
  getEpisodeByIdFunction: lambdaFunctionStack.getEpisodeByIdFunction,
  updateEpisodeFunction: lambdaFunctionStack.updateEpisodeFunction,
  deleteEpisodeFunction: lambdaFunctionStack.deleteEpisodeFunction,
  listEpisodesFunction: lambdaFunctionStack.listEpisodesFunction,
  // Video Signature Functions
  getVideoSignatureFunction: lambdaFunctionStack.getVideoSignatureFunction,
  // Top 10 Functions
  createTop10Function: lambdaFunctionStack.createTop10Function,
  deleteTop10Function: lambdaFunctionStack.deleteTop10Function,
  listTop10Function: lambdaFunctionStack.listTop10Function,
});

// 10. Stack de métodos de API de comercio
const commerceApiMethodsStack = new CommerceApiMethodsStack(app, 'CommerceApiMethodsStack', {
  ...generateStackProps(config, STACK_NAMES.COMMERCE_API_METHODS),
  environment: config.environment,
  restApiId: apiGatewayStack.restApiId,
  restApiRootResourceId: apiGatewayStack.restApiRootResourceId,
  // Package Type Functions
  createPackageTypeFunction: lambdaFunctionStack.createPackageTypeFunction,
  getPackageTypeByIdFunction: lambdaFunctionStack.getPackageTypeByIdFunction,
  updatePackageTypeFunction: lambdaFunctionStack.updatePackageTypeFunction,
  deletePackageTypeFunction: lambdaFunctionStack.deletePackageTypeFunction,
  listPackageTypesFunction: lambdaFunctionStack.listPackageTypesFunction,
  changePackageTypeStatusFunction: lambdaFunctionStack.changePackageTypeStatusFunction,
  listPackageTypesActiveFunction: lambdaFunctionStack.listPackageTypesActiveFunction,
  // Package Seller Functions
  createPackageSellerFunction: lambdaFunctionStack.createPackageSellerFunction,
  getPackageSellerByIdFunction: lambdaFunctionStack.getPackageSellerByIdFunction,
  updatePackageSellerFunction: lambdaFunctionStack.updatePackageSellerFunction,
  deletePackageSellerFunction: lambdaFunctionStack.deletePackageSellerFunction,
  listPackageSellerFunction: lambdaFunctionStack.listPackageSellerFunction,
  changePackageSellerStatusFunction: lambdaFunctionStack.changePackageSellerStatusFunction,
  // Package User Functions
  createPackageUserFunction: lambdaFunctionStack.createPackageUserFunction,
  getPackageUserByIdFunction: lambdaFunctionStack.getPackageUserByIdFunction,
  updatePackageUserFunction: lambdaFunctionStack.updatePackageUserFunction,
  deletePackageUserFunction: lambdaFunctionStack.deletePackageUserFunction,
  listPackageUsersFunction: lambdaFunctionStack.listPackageUsersFunction,
  changePackageUserStatusFunction: lambdaFunctionStack.changePackageUserStatusFunction,

  // Resource Functions
  createResourceFunction: lambdaFunctionStack.createResourceFunction,
  getResourceByIdFunction: lambdaFunctionStack.getResourceByIdFunction,
  updateResourceFunction: lambdaFunctionStack.updateResourceFunction,
  deleteResourceFunction: lambdaFunctionStack.deleteResourceFunction,
  listResourceFunction: lambdaFunctionStack.listResourceFunction,
  changeResourceStatusFunction: lambdaFunctionStack.changeResourceStateFunction,
  // Seller Credit Functions
  assignSellerCreditFunction: lambdaFunctionStack.assignSellerCreditFunction,
  getSellerCreditByIdFunction: lambdaFunctionStack.getSellerCreditByIdFunction,
  // Reseller Functions
  createResellerFunction: lambdaFunctionStack.createRevendedorFunction,
  listResellersFunction: lambdaFunctionStack.listRevendedoresFunction,

  // Transferencia de crédito
  transferirCreditosFunction: lambdaFunctionStack.transferirCreditosFunction,
});

// 11. Stack de métodos de API de aplicación
const appApiMethodsStack = new AppApiMethodsStack(app, 'AppApiMethodsStack', {
  ...generateStackProps(config, STACK_NAMES.APP_API_METHODS),
  environment: config.environment,
  restApiId: apiGatewayStack.restApiId,
  restApiRootResourceId: apiGatewayStack.restApiRootResourceId,
  // App Functions
  getHomeDataFunction: lambdaFunctionStack.getHomeDataFunction,
});


// Configurar dependencias entre stacks
lambdaRoleStack.addDependency(lambdaLayerStack);
lambdaFunctionStack.addDependency(lambdaLayerStack);
lambdaFunctionStack.addDependency(lambdaRoleStack);

apiGatewayStack.addDependency(lambdaFunctionStack);
apiGatewayStack.addDependency(securityStack); // Para el certificado SSL
apiGatewayStack.addDependency(monitoringStack); // Para los logs

// Dependencias para los nuevos stacks de métodos de API
authApiMethodsStack.addDependency(apiGatewayStack);
authApiMethodsStack.addDependency(lambdaFunctionStack);
contentApiMethodsStack.addDependency(apiGatewayStack);
contentApiMethodsStack.addDependency(lambdaFunctionStack);
commerceApiMethodsStack.addDependency(apiGatewayStack);
commerceApiMethodsStack.addDependency(lambdaFunctionStack);
appApiMethodsStack.addDependency(apiGatewayStack);
appApiMethodsStack.addDependency(lambdaFunctionStack);

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