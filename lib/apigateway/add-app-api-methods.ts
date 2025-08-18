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


}