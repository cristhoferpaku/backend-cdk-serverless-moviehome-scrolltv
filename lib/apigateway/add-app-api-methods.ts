import { Construct } from 'constructs';
import { RestApi, LambdaIntegration, Resource, Cors, CorsOptions } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

interface AppApiMethodsProps {
  restApi: {
    restApiId: string;
    restApiRootResourceId: string;
  };
  authorizer?: any;
  scope: Construct;
  lambdaFunctions: {
    // Cast Member Functions
    getHomeDataFunction: NodejsFunction;
    getContentDataDetailFunction: NodejsFunction;
    getCollectionContentFunction: NodejsFunction;
    getSearchContentFunction: NodejsFunction;
    logoutMobileFunction: NodejsFunction;
    validateServiceExpirationFunction: NodejsFunction;
    getEpisodesFromSeasonFunction: NodejsFunction;
    getAllLiveTvFunction: NodejsFunction;
  };
}

export function addAppApiMethods(props: AppApiMethodsProps): void {
  const { restApi, authorizer, scope, lambdaFunctions } = props;

  // Importar el REST API usando los IDs
  const api = RestApi.fromRestApiAttributes(scope, 'ImportedRestApi', {
    restApiId: restApi.restApiId,
    rootResourceId: restApi.restApiRootResourceId,
  });

  // Configuración CORS para todos los recursos
  const corsOptions: CorsOptions = {
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: Cors.ALL_METHODS,
    allowHeaders: [
      'Content-Type',
      'Authorization',
      'X-Amz-Date',
      'X-Api-Key',
      'X-Amz-Security-Token'
    ],
    allowCredentials: true
  };

  // Obtener el recurso admin existente (debe haber sido creado por AuthApiMethodsStack)

  // === CAST MEMBERS ENDPOINTS ===
  const castMembersResource = api.root.addResource('get-home-data', {
    defaultCorsPreflightOptions: corsOptions
  });
  castMembersResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getHomeDataFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  // === CONTENT ENDPOINTS ===
  const contentResource = api.root.addResource('get-content-data-detail', {
    defaultCorsPreflightOptions: corsOptions
  });
  const contentIdResource = contentResource.addResource('{id}', {
    defaultCorsPreflightOptions: corsOptions
  });
  contentIdResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getContentDataDetailFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  // === COLLECTION ENDPOINTS ===
  const collectionResource = api.root.addResource('get-collection-content', {
    defaultCorsPreflightOptions: corsOptions
  });
  const collectionIdResource = collectionResource.addResource('{id}', {
    defaultCorsPreflightOptions: corsOptions
  });
  collectionIdResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getCollectionContentFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === SEARCH ENDPOINTS ===
  const searchResource = api.root.addResource('get-search-content', {
    defaultCorsPreflightOptions: corsOptions
  });
  searchResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getSearchContentFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  // === LOGOUT ENDPOINTS ===
  const logoutResource = api.root.addResource('logout-mobile', {
    defaultCorsPreflightOptions: corsOptions
  });
  logoutResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.logoutMobileFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === VALIDATE SERVICE EXPIRATION ENDPOINTS ===
  const validateServiceExpirationResource = api.root.addResource('validate-service-expiration', {
    defaultCorsPreflightOptions: corsOptions
  });
  validateServiceExpirationResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.validateServiceExpirationFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === GET EPISODES FROM SEASON ENDPOINTS ===
  const getEpisodesFromSeasonResource = api.root.addResource('get-episodes-from-season', {
    defaultCorsPreflightOptions: corsOptions
  });
  const seasonIdResource = getEpisodesFromSeasonResource.addResource('{id}', {
    defaultCorsPreflightOptions: corsOptions
  });
  seasonIdResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getEpisodesFromSeasonFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === GET ALL LIVE TV ENDPOINTS ===
  const getAllLiveTvResource = api.root.addResource('get-all-live-tv', {
    defaultCorsPreflightOptions: corsOptions
  });
  getAllLiveTvResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getAllLiveTvFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

}