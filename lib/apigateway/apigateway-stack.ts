import { CfnOutput, Stack, StackProps, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  RestApi,
  Deployment,
  Stage,
  Cors,
  ResponseType,
  LogGroupLogDestination,
  DomainName,
  BasePathMapping,
  SecurityPolicy,
  MethodLoggingLevel
} from 'aws-cdk-lib/aws-apigateway';

import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

export interface ApiGatewayStackProps extends StackProps {
  environment: string;
  domainName: string;
  certificate: Certificate;
  logGroup: LogGroup;
}

export class ApiGatewayStack extends Stack {
  public readonly restApi: RestApi;
  public readonly customDomain?: DomainName;
  public readonly restApiId: string;
  public readonly restApiRootResourceId: string;

  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const { environment, domainName, certificate, logGroup } = props;
    const apiSubdomain = `api.${domainName}`;

    this.restApi = new RestApi(this, 'MovieHomeScrollTvApi', {
      restApiName: `MovieHome ScrollTV API - ${environment}`,
      description: `API Gateway para MovieHome ScrollTV Backend - ${environment}`,
      deploy: false,
      cloudWatchRole: true,
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

    // Crear dominio personalizado usando el certificado del SecurityStack
    this.customDomain = new DomainName(this, 'CustomDomain', {
      domainName: apiSubdomain,
      certificate: certificate,
      securityPolicy: SecurityPolicy.TLS_1_2,
    });

    // Asignar valores para exports
    this.restApiId = this.restApi.restApiId;
    this.restApiRootResourceId = this.restApi.restApiRootResourceId;

    // Despliegue manual
    const deployment = new Deployment(this, 'Deployment', {
      api: this.restApi,
    });

    const devStage = new Stage(this, 'DevStage', {
      deployment,
      stageName: 'dev',
      accessLogDestination: new LogGroupLogDestination(logGroup),
      loggingLevel: MethodLoggingLevel.ERROR,
      dataTraceEnabled: true,
      metricsEnabled: true,
    });

    const prodStage = new Stage(this, 'ProdStage', {
      deployment,
      stageName: 'prod',
      accessLogDestination: new LogGroupLogDestination(logGroup),
      loggingLevel: MethodLoggingLevel.INFO,
      dataTraceEnabled: false,
      metricsEnabled: true,
    });

    // Apuntar el deployment principal a producción
    this.restApi.deploymentStage = prodStage;

    // Mapear el dominio personalizado a los stages
    new BasePathMapping(this, 'DevBasePathMapping', {
      domainName: this.customDomain,
      restApi: this.restApi,
      stage: devStage,
      basePath: 'dev', // api.scrollprivate.work/dev/
    });

    new BasePathMapping(this, 'ProdBasePathMapping', {
      domainName: this.customDomain,
      restApi: this.restApi,
      stage: prodStage,
      basePath: '', // api.scrollprivate.work/ (sin prefijo para prod)
    });

    // Outputs opcionales
    new CfnOutput(this, 'ApiGatewayUrl', {
      value: this.restApi.url,
      description: 'URL del API Gateway (AWS)',
    });

    // Outputs del dominio personalizado
    new CfnOutput(this, 'CustomDomainUrl', {
      value: `https://${apiSubdomain}`,
      description: 'URL del dominio personalizado',
    });

    new CfnOutput(this, 'CustomDomainTarget', {
      value: this.customDomain.domainNameAliasDomainName,
      description: 'Target CNAME para configurar en Cloudflare',
    });

    new CfnOutput(this, 'ApiGatewayId', {
      value: this.restApi.restApiId,
      description: 'ID del API Gateway',
    });

    // Exports para otros stacks
    new CfnOutput(this, 'RestApiId', {
      value: this.restApiId,
      exportName: `${this.stackName}-RestApiId`,
      description: 'ID del REST API para importar en otros stacks',
    });

    new CfnOutput(this, 'RestApiRootResourceId', {
      value: this.restApiRootResourceId,
      exportName: `${this.stackName}-RestApiRootResourceId`,
      description: 'ID del recurso raíz del REST API para importar en otros stacks',
    });

    Tags.of(this).add('Component', 'ApiGateway');
    Tags.of(this).add('Environment', environment);
  }
}
