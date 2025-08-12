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
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { addAllApiMethods } from './add-api-methods';

export interface ApiGatewayStackProps extends StackProps {
  environment: string;
  domainName: string;
  certificate: Certificate;
  logGroup: LogGroup;
  lambdaFunctions: {
    adminLoginFunction: NodejsFunction;
    refreshTokenFunction: NodejsFunction;
    listUserAdminsFunction: NodejsFunction;
    createUserAdminFunction: NodejsFunction;
    getUserAdminByIdFunction: NodejsFunction;
    updateUserAdminFunction: NodejsFunction;
    deleteUserAdminFunction: NodejsFunction;
    changeUserAdminStatusFunction: NodejsFunction;
    getPlatformsFunction: NodejsFunction;
    getRolesFunction: NodejsFunction;
    createPackageSellerFunction: NodejsFunction;
    createPackageTypeFunction: NodejsFunction;
    listPackageTypesFunction: NodejsFunction;
    getPackageTypeByIdFunction: NodejsFunction;
    deletePackageTypeFunction: NodejsFunction;
    updatePackageTypeFunction: NodejsFunction;
    changePackageTypeStatusFunction: NodejsFunction;
    listPackageSellerFunction: NodejsFunction;
    getPackageSellerByIdFunction: NodejsFunction;
    updatePackageSellerFunction: NodejsFunction;
    deletePackageSellerFunction: NodejsFunction;
    changePackageSellerStatusFunction: NodejsFunction;
    createPackageUserFunction: NodejsFunction;
    getPackageUserByIdFunction: NodejsFunction;
    listPackageUsersFunction: NodejsFunction;
    updatePackageUserFunction: NodejsFunction;
    deletePackageUserFunction: NodejsFunction;
    changePackageUserStatusFunction: NodejsFunction;
    listPackageTypesActiveFunction: NodejsFunction;
    createUserAccountFunction: NodejsFunction;
    getUserAccountByIdFunction: NodejsFunction;
    listUserAccountsFunction: NodejsFunction;
    updateUserAccountFunction: NodejsFunction;
    deleteUserAccountFunction: NodejsFunction;
    changeUserAccountStatusFunction: NodejsFunction;
    listUserAccountByAdminFunction: NodejsFunction;
    assignSellerCreditFunction: NodejsFunction;
    createResourceFunction: NodejsFunction;
    listResourceFunction: NodejsFunction;
    getResourceByIdFunction: NodejsFunction;
    changeResourceStateFunction: NodejsFunction;
    deleteResourceFunction: NodejsFunction;
    updateResourceFunction: NodejsFunction;
    getSellerCreditByIdFunction: NodejsFunction;
    listCastMembersFunction: NodejsFunction;
    getCastMemberByIdFunction: NodejsFunction;
    createCastMemberFunction: NodejsFunction;
    updateCastMemberFunction: NodejsFunction;
    deleteCastMemberFunction: NodejsFunction;
    listAllCountriesFunction: NodejsFunction;
    getAllSectionsFunction: NodejsFunction;
    listCollectionsFunction: NodejsFunction;
    getCollectionByIdFunction: NodejsFunction;
    createCollectionFunction: NodejsFunction;
    updateCollectionFunction: NodejsFunction;
    deleteCollectionFunction: NodejsFunction;
    changeCollectionStatusFunction: NodejsFunction;
    getAllCollectionsFunction: NodejsFunction;
    listMultimediaCategoriesFunction: NodejsFunction;
    getMultimediaCategoryByIdFunction: NodejsFunction;
    createMultimediaCategoryFunction: NodejsFunction;
    updateMultimediaCategoryFunction: NodejsFunction;
    deleteMultimediaCategoryFunction: NodejsFunction;
    changeMultimediaCategoryStatusFunction: NodejsFunction;
    getAllMultimediaCategoriesFunction: NodejsFunction;
    createMovieFunction: NodejsFunction;
    getMovieByIdFunction: NodejsFunction;
    deleteMovieFunction: NodejsFunction;
    changeMovieStatusFunction: NodejsFunction;
    updateMovieFunction: NodejsFunction;
    createSeriesFunction: NodejsFunction;
    getSeriesByIdFunction: NodejsFunction;
    deleteSeriesFunction: NodejsFunction;
    changeSeriesStatusFunction: NodejsFunction;
    updateSeriesFunction: NodejsFunction;
    listMultimediaFunction: NodejsFunction;
    createSeasonFunction: NodejsFunction;
    getSeasonByIdFunction: NodejsFunction;
    listSeasonsFunction: NodejsFunction;
    deleteSeasonFunction: NodejsFunction;
    updateSeasonFunction: NodejsFunction;
    createEpisodeFunction: NodejsFunction;
    getEpisodeByIdFunction: NodejsFunction;
    listEpisodesFunction: NodejsFunction;
    deleteEpisodeFunction: NodejsFunction;
    updateEpisodeFunction: NodejsFunction;
    getVideoSignatureFunction: NodejsFunction;
    listTop10Function: NodejsFunction;
    createTop10Function: NodejsFunction;
    deleteTop10Function: NodejsFunction;
    createRevendedorFunction: NodejsFunction;
    listRevendedoresFunction: NodejsFunction;
    transferirCreditosFunction: NodejsFunction;
    
    clientLoginFunction: NodejsFunction;
  };
}

export class ApiGatewayStack extends Stack {
  public readonly restApi: RestApi;
  public readonly customDomain?: DomainName;

  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const { environment, domainName, certificate, logGroup, lambdaFunctions } = props;
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

    // Agregar todos los métodos a la API
    addAllApiMethods({
      restApi: this.restApi,
      authorizer: undefined, // JWT se valida en la Lambda
      scope: this,
      lambdaFunctions,
    });

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

    Tags.of(this).add('Component', 'ApiGateway');
    Tags.of(this).add('Environment', environment);
  }
}
