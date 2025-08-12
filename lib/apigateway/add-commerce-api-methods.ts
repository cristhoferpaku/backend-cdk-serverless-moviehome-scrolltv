import { Construct } from 'constructs';
import { RestApi, LambdaIntegration, Resource } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

interface CommerceApiMethodsProps {
  restApi: {
    restApiId: string;
    restApiRootResourceId: string;
  };
  authorizer?: any;
  scope: Construct;
  lambdaFunctions: {
    // Package Type Functions
    createPackageTypeFunction: NodejsFunction;
    getPackageTypeByIdFunction: NodejsFunction;
    changePackageTypeStatusFunction: NodejsFunction;
    listPackageTypesActiveFunction: NodejsFunction;
    updatePackageTypeFunction: NodejsFunction;
    deletePackageTypeFunction: NodejsFunction;
    listPackageTypesFunction: NodejsFunction;
    // Package Seller Functions
    createPackageSellerFunction: NodejsFunction;
    getPackageSellerByIdFunction: NodejsFunction;
    changePackageSellerStatusFunction: NodejsFunction;
    updatePackageSellerFunction: NodejsFunction;
    deletePackageSellerFunction: NodejsFunction;
    listPackageSellerFunction: NodejsFunction;
    // Package User Functions
    createPackageUserFunction: NodejsFunction;
    getPackageUserByIdFunction: NodejsFunction;
    changePackageUserStatusFunction: NodejsFunction;
    updatePackageUserFunction: NodejsFunction;
    deletePackageUserFunction: NodejsFunction;
    listPackageUsersFunction: NodejsFunction;
    // Resource Functions
    createResourceFunction: NodejsFunction;
    getResourceByIdFunction: NodejsFunction;
    updateResourceFunction: NodejsFunction;
    deleteResourceFunction: NodejsFunction;
    listResourceFunction: NodejsFunction;
    changeResourceStatusFunction: NodejsFunction;
    // Seller Credit Functions
    assignSellerCreditFunction: NodejsFunction; // Assign Seller Credit
    getSellerCreditByIdFunction: NodejsFunction; // Get Seller Credit by ID
    // Reseller Functions
    createResellerFunction: NodejsFunction;
    listResellersFunction: NodejsFunction;
    // Transferencia de crédito
    transferirCreditosFunction: NodejsFunction;
  };
}

export function addCommerceApiMethods(props: CommerceApiMethodsProps): void {
  const { restApi, authorizer, scope, lambdaFunctions } = props;

  // Importar el REST API usando los IDs
  const api = RestApi.fromRestApiAttributes(scope, 'ImportedRestApi', {
    restApiId: restApi.restApiId,
    rootResourceId: restApi.restApiRootResourceId,
  });

  // === PACKAGES ENDPOINTS ===
  const packageResource = api.root.addResource('packages');

  // === PACKAGE TYPES ENDPOINTS ===
  const packageTypesResource = packageResource.addResource('type');
  packageTypesResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createPackageTypeFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  packageTypesResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listPackageTypesFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  const packageTypeResource = packageTypesResource.addResource('{id}');
  packageTypeResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getPackageTypeByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  packageTypeResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updatePackageTypeFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  packageTypeResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deletePackageTypeFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const packageTypeActiveResource = packageTypeResource.addResource('status');
  packageTypeActiveResource.addMethod('PATCH', new LambdaIntegration(lambdaFunctions.changePackageTypeStatusFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  packageTypeActiveResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listPackageTypesActiveFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === PACKAGE SELLERS ENDPOINTS ===
  const packageSellersResource = packageResource.addResource('seller');
  packageSellersResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createPackageSellerFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  packageSellersResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listPackageSellerFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  const packageSellerResource = packageSellersResource.addResource('{id}');
  packageSellerResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getPackageSellerByIdFunction), { 
    authorizationType: authorizer ? undefined : undefined,
  });
  packageSellerResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updatePackageSellerFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  packageSellerResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deletePackageSellerFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const packageSellerActiveResource = packageSellerResource.addResource('status');
  packageSellerActiveResource.addMethod('PATCH', new LambdaIntegration(lambdaFunctions.changePackageSellerStatusFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });


  // === PACKAGE USERS ENDPOINTS ===
  const packageUsersResource = packageResource.addResource('user');
  packageUsersResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createPackageUserFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  packageUsersResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listPackageUsersFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  const packageUserResource = packageUsersResource.addResource('{id}');
  packageUserResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getPackageUserByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  packageUserResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updatePackageUserFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  packageUserResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deletePackageUserFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const packageUserActiveResource = packageUserResource.addResource('status');
  packageUserActiveResource.addMethod('PATCH', new LambdaIntegration(lambdaFunctions.changePackageUserStatusFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === RESOURCES ENDPOINTS ===
  
  const resourcesResource = api.root.addResource('resources');
  resourcesResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createResourceFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  resourcesResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listResourceFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  const resourceResource = resourcesResource.addResource('{id}');
  resourceResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getResourceByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  resourceResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updateResourceFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  resourceResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteResourceFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const resourceActiveResource = resourceResource.addResource('state');
  resourceActiveResource.addMethod('PATCH', new LambdaIntegration(lambdaFunctions.changeResourceStatusFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });


  // === SELLER CREDITS ENDPOINTS ===
  const sellerCreditsResource = api.root.addResource('seller-credit');
  sellerCreditsResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.assignSellerCreditFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  sellerCreditsResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getSellerCreditByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });



  // === RESELLERS ENDPOINTS ===
  const resellersResource = api.root.addResource('revendedores');
  resellersResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createResellerFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  resellersResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listResellersFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  

  // === TRANSFERENCIA DE CRÉDITO ENDPOINTS ===
  const transferenciaCreditoResource = api.root.addResource('transferir-creditos');
  transferenciaCreditoResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.transferirCreditosFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

}