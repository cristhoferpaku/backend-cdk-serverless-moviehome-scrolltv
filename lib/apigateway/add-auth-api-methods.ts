import { Construct } from 'constructs';
import { RestApi, LambdaIntegration, Resource } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

interface AuthApiMethodsProps {
  restApi: {
    restApiId: string;
    restApiRootResourceId: string;
  };
  authorizer?: any;
  scope: Construct;
  lambdaFunctions: {
    // Auth Functions
    adminLoginFunction: NodejsFunction;
    clientLoginFunction: NodejsFunction;
    refreshTokenFunction: NodejsFunction;
    // User Admin Functions
    createUserAdminFunction: NodejsFunction;
    getUserAdminByIdFunction: NodejsFunction;
    updateUserAdminFunction: NodejsFunction;
    deleteUserAdminFunction: NodejsFunction;
    listUserAdminsFunction: NodejsFunction;
    changeUserAdminStatusFunction: NodejsFunction;
    // User Account Functions
    getUserAccountByIdFunction: NodejsFunction;
    listUserAccountsFunction: NodejsFunction;
    listUserAccountByAdminFunction: NodejsFunction;
    createUserAccountFunction: NodejsFunction;
    updateUserAccountFunction: NodejsFunction;
    deleteUserAccountFunction: NodejsFunction;
    changeUserAccountStatusFunction: NodejsFunction;
    // Platform Functions
    getPlatformsFunction : NodejsFunction;
    // Role Functions
    getRolesFunction: NodejsFunction;
  };
}

export function addAuthApiMethods(props: AuthApiMethodsProps): void {
  const { restApi, authorizer, scope, lambdaFunctions } = props;

  // Importar el REST API usando los IDs
  const api = RestApi.fromRestApiAttributes(scope, 'ImportedRestApi', {
    restApiId: restApi.restApiId,
    rootResourceId: restApi.restApiRootResourceId,
  });

  // === AUTH ENDPOINTS ===
  const authResource = api.root.addResource('auth');
  
  const adminLoginResource = authResource.addResource('login');
  adminLoginResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.adminLoginFunction));
  
  const userLoginResource = authResource.addResource('client-login');
  userLoginResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.clientLoginFunction));

  const refreshLoginResource = authResource.addResource('refresh');
  refreshLoginResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.refreshTokenFunction));

  
  // === USER ADMIN ENDPOINTS ===
  const usersAdminResource = api.root.addResource('admin-users');
  usersAdminResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createUserAdminFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  usersAdminResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listUserAdminsFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  const userAdminResource = usersAdminResource.addResource('{id}');
  userAdminResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getUserAdminByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  userAdminResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updateUserAdminFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  userAdminResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteUserAdminFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const userAdminActiveResource = userAdminResource.addResource('status');
  userAdminActiveResource.addMethod('PATCH', new LambdaIntegration(lambdaFunctions.changeUserAdminStatusFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === USER ACCOUNT ENDPOINTS ===
  const userAccountResource = api.root.addResource('user-account');
  userAccountResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createUserAccountFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  userAccountResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listUserAccountsFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const userAccountListResource = userAccountResource.addResource('admin');
  userAccountListResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listUserAccountByAdminFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const userAccountIdResource = userAccountResource.addResource('{id}');
  userAccountIdResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getUserAccountByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
 
  userAccountIdResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updateUserAccountFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  userAccountIdResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteUserAccountFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const userAccountActiveResource = userAccountIdResource.addResource('status');
  userAccountActiveResource.addMethod('PATCH', new LambdaIntegration(lambdaFunctions.changeUserAccountStatusFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === PLATFORM ENDPOINTS ===
  const platformsResource = api.root.addResource('platforms');

  platformsResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getPlatformsFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });


  // === ROLE ENDPOINTS ===
  const rolesResource = api.root.addResource('roles');

  rolesResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getRolesFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

}