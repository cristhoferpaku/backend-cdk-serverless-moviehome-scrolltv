import { Stack, StackProps, Fn } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { addAppApiMethods } from './add-app-api-methods';
import { STACK_NAMES } from '../config/stack-config';

export interface AppApiMethodsStackProps extends StackProps {
  environment: string;
  restApiId: string;
  restApiRootResourceId: string;
  // App Lambda Functions
  getHomeDataFunction: NodejsFunction;
  getContentDataDetailFunction: NodejsFunction;
  getCollectionContentFunction: NodejsFunction;
  getSearchContentFunction: NodejsFunction; 
  logoutMobileFunction: NodejsFunction; 
  validateServiceExpirationFunction: NodejsFunction;  
  getEpisodesFromSeasonFunction: NodejsFunction;  
  getAllLiveTvFunction: NodejsFunction;
}

export class AppApiMethodsStack extends Stack {
  constructor(scope: Construct, id: string, props: AppApiMethodsStackProps) {
    super(scope, id, props);

    const {
      environment,
      restApiId,
      restApiRootResourceId,
      // App Functions
      getHomeDataFunction,
      getContentDataDetailFunction,
      getCollectionContentFunction,
      getSearchContentFunction,
      logoutMobileFunction,
      validateServiceExpirationFunction,  
      getEpisodesFromSeasonFunction,
      getAllLiveTvFunction,
    } = props;

    // Importar el REST API desde ApiGatewayStack
    const restApi = {
      restApiId,
      restApiRootResourceId,
    };

    // Agregar métodos de autenticación a la API
    addAppApiMethods({
      restApi,
      authorizer: undefined, // JWT se valida en la Lambda
      scope: this,
      lambdaFunctions: {
        getHomeDataFunction,
        getContentDataDetailFunction,
        getCollectionContentFunction,
        getSearchContentFunction,
        logoutMobileFunction,
        validateServiceExpirationFunction,
        getEpisodesFromSeasonFunction,
        getAllLiveTvFunction,
      },
    });
  }
}