import { CfnOutput, Stack, StackProps, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  RestApi,
  Deployment,
  Stage,
  Cors,
  ResponseType,
  LogGroupLogDestination
} from 'aws-cdk-lib/aws-apigateway';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { addAllApiMethods } from './add-api-methods';

export interface ApiGatewayStackProps extends StackProps {
  environmentStack?: any;
}

export class ApiGatewayStack extends Stack {
  public readonly restApi: RestApi;

  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const logGroup = new LogGroup(this, 'ApiGatewayLogGroup');

    this.restApi = new RestApi(this, 'MovieHomeScrollTvApi', {
      restApiName: 'MovieHome ScrollTV API',
      description: 'API Gateway para MovieHome ScrollTV Backend',
      deploy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
      },
      binaryMediaTypes: ['multipart/form-data'],
    });

    // Configuración de respuestas comunes
    this.restApi.addGatewayResponse('UnauthorizedResponse', {
      type: ResponseType.UNAUTHORIZED,
      statusCode: '401',
      responseHeaders: {
        'Access-Control-Allow-Origin': "'*'",
        'Access-Control-Allow-Methods': "'GET,POST,PUT,DELETE,OPTIONS'",
        'Access-Control-Allow-Headers': "'Content-Type,Authorization'",
      },
      templates: {
        'application/json': '{ "message": "No autorizado", "code": "0001" }',
      },
    });

    // Agregar todos los métodos a la API
    addAllApiMethods({
      restApi: this.restApi,
      authorizer: undefined, // JWT se valida en la Lambda
      scope: this,
    });

    // Despliegue manual
    const deployment = new Deployment(this, 'Deployment', {
      api: this.restApi,
    });

    const devStage = new Stage(this, 'DevStage', {
      deployment,
      stageName: 'dev',
    });

    const prodStage = new Stage(this, 'ProdStage', {
      deployment,
      stageName: 'prod',
    });

    // Apuntar el deployment principal a producción
    this.restApi.deploymentStage = prodStage;

    // Outputs opcionales
    new CfnOutput(this, 'ApiGatewayUrl', {
      value: this.restApi.url,
      description: 'URL del API Gateway',
    });

    new CfnOutput(this, 'ApiGatewayId', {
      value: this.restApi.restApiId,
      description: 'ID del API Gateway',
    });

    Tags.of(this).add('Component', 'ApiGateway');
  }
}
