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
  SecurityPolicy
} from 'aws-cdk-lib/aws-apigateway';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone, ARecord, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { ApiGatewayDomain } from 'aws-cdk-lib/aws-route53-targets';
import { addAllApiMethods } from './add-api-methods';

export interface ApiGatewayStackProps extends StackProps {
  environmentStack?: any;
  domainName?: string;
  certificateArn?: string;
}

export class ApiGatewayStack extends Stack {
  public readonly restApi: RestApi;
  public readonly customDomain?: DomainName;

  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const logGroup = new LogGroup(this, 'ApiGatewayLogGroup');

    // Configuración del dominio personalizado
    const domainName = props.domainName || 'scrollprivate.work';
    const apiSubdomain = `api.${domainName}`;

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

    // Crear certificado SSL para el dominio personalizado
    const certificate = new Certificate(this, 'ApiCertificate', {
      domainName: apiSubdomain,
      subjectAlternativeNames: [`*.${domainName}`], // Para subdominios adicionales
      validation: CertificateValidation.fromDns(),
    });

    // Crear dominio personalizado
    this.customDomain = new DomainName(this, 'CustomDomain', {
      domainName: apiSubdomain,
      certificate: certificate,
      securityPolicy: SecurityPolicy.TLS_1_2,
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

    // Output del certificado
    new CfnOutput(this, 'CertificateArn', {
      value: certificate.certificateArn,
      description: 'ARN del certificado SSL',
    });

    Tags.of(this).add('Component', 'ApiGateway');
  }
}
