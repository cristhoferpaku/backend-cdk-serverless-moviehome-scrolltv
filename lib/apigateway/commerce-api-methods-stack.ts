import { Stack, StackProps, Fn } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { addCommerceApiMethods } from './add-commerce-api-methods';
import { STACK_NAMES } from '../config/stack-config';

export interface CommerceApiMethodsStackProps extends StackProps {
  environment: string;
  restApiId: string;
  restApiRootResourceId: string;
  // Package Type Functions
  createPackageTypeFunction: NodejsFunction;
  getPackageTypeByIdFunction: NodejsFunction;
  updatePackageTypeFunction: NodejsFunction;
  deletePackageTypeFunction: NodejsFunction;
  listPackageTypesFunction: NodejsFunction;
  changePackageTypeStatusFunction: NodejsFunction;
  listPackageTypesActiveFunction: NodejsFunction;
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
  assignSellerCreditFunction: NodejsFunction;
  getSellerCreditByIdFunction: NodejsFunction;
  // Reseller Functions
  createResellerFunction: NodejsFunction;
  listResellersFunction: NodejsFunction;

  // Transferencia de crédito
  transferirCreditosFunction: NodejsFunction;
}

export class CommerceApiMethodsStack extends Stack {
  constructor(scope: Construct, id: string, props: CommerceApiMethodsStackProps) {
    super(scope, id, props);

    const {
      environment,
      restApiId,
      restApiRootResourceId,
      // Package Type Functions
      createPackageTypeFunction,
      getPackageTypeByIdFunction,
      changePackageTypeStatusFunction,
      listPackageTypesActiveFunction,
      updatePackageTypeFunction,
      deletePackageTypeFunction,
      listPackageTypesFunction,
      // Package Seller Functions
      createPackageSellerFunction,
      getPackageSellerByIdFunction,
      changePackageSellerStatusFunction,
      updatePackageSellerFunction,
      deletePackageSellerFunction,
      listPackageSellerFunction,
      // Package User Functions
      createPackageUserFunction,
      getPackageUserByIdFunction,
      changePackageUserStatusFunction,
      updatePackageUserFunction,
      deletePackageUserFunction,
      listPackageUsersFunction,
      // Resource Functions
      createResourceFunction,
      getResourceByIdFunction,
      changeResourceStatusFunction,
      updateResourceFunction,
      deleteResourceFunction,
      listResourceFunction,
      // Seller Credit Functions
      assignSellerCreditFunction,
      getSellerCreditByIdFunction,
      // Reseller Functions
      createResellerFunction,
      listResellersFunction,

      // Transferencia de crédito
      transferirCreditosFunction
    } = props;

    // Importar el REST API desde ApiGatewayStack
    const restApi = {
      restApiId,
      restApiRootResourceId,
    };

    // Agregar métodos de comercio a la API
    addCommerceApiMethods({
      restApi,
      authorizer: undefined, // JWT se valida en la Lambda
      scope: this,
      lambdaFunctions: {
        // Package Type Functions
        createPackageTypeFunction,
        getPackageTypeByIdFunction,
        changePackageTypeStatusFunction,
        listPackageTypesActiveFunction,
        updatePackageTypeFunction,
        deletePackageTypeFunction,
        listPackageTypesFunction,
        // Package Seller Functions
        createPackageSellerFunction,
        getPackageSellerByIdFunction,
        changePackageSellerStatusFunction,
        updatePackageSellerFunction,
        deletePackageSellerFunction,
        listPackageSellerFunction,
        // Package User Functions
        createPackageUserFunction,
        getPackageUserByIdFunction,
        changePackageUserStatusFunction,
        updatePackageUserFunction,
        deletePackageUserFunction,
        listPackageUsersFunction,
        // Resource Functions
        createResourceFunction,
        getResourceByIdFunction,
        changeResourceStatusFunction,
        updateResourceFunction,
        deleteResourceFunction,
        listResourceFunction,
        // Seller Credit Functions
        assignSellerCreditFunction,
        getSellerCreditByIdFunction,
        // Reseller Functions
        createResellerFunction,
        listResellersFunction,

        // Transferencia de crédito
        transferirCreditosFunction
      },
    });
  }
}