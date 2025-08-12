import { Stack, StackProps, Fn } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { addAuthApiMethods } from './add-auth-api-methods';
import { STACK_NAMES } from '../config/stack-config';

export interface AuthApiMethodsStackProps extends StackProps {
  environment: string;
  restApiId: string;
  restApiRootResourceId: string;
  // Auth Lambda Functions
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
  getPlatformsFunction: NodejsFunction;
  // Role Functions
  getRolesFunction: NodejsFunction;
}

export class AuthApiMethodsStack extends Stack {
  constructor(scope: Construct, id: string, props: AuthApiMethodsStackProps) {
    super(scope, id, props);

    const {
      environment,
      restApiId,
      restApiRootResourceId,
      // Auth Functions
      adminLoginFunction,
      clientLoginFunction,
      refreshTokenFunction,
      // User Admin Functions
      createUserAdminFunction,
      getUserAdminByIdFunction,
      updateUserAdminFunction,
      deleteUserAdminFunction,
      listUserAdminsFunction,
      changeUserAdminStatusFunction,
      // User Account Functions
      getUserAccountByIdFunction,
      listUserAccountsFunction,
      listUserAccountByAdminFunction,
      createUserAccountFunction,
      updateUserAccountFunction,
      deleteUserAccountFunction,
      changeUserAccountStatusFunction,
      // Platform Functions
      getPlatformsFunction,
      // Role Functions
      getRolesFunction,
    } = props;

    // Importar el REST API desde ApiGatewayStack
    const restApi = {
      restApiId,
      restApiRootResourceId,
    };

    // Agregar métodos de autenticación a la API
    addAuthApiMethods({
      restApi,
      authorizer: undefined, // JWT se valida en la Lambda
      scope: this,
      lambdaFunctions: {
        // Auth Functions
        adminLoginFunction,
        clientLoginFunction,
        refreshTokenFunction,
        // User Admin Functions
        createUserAdminFunction,
        getUserAdminByIdFunction,
        updateUserAdminFunction,
        deleteUserAdminFunction,
        listUserAdminsFunction,
        changeUserAdminStatusFunction,
        // User Account Functions
        getUserAccountByIdFunction,
        listUserAccountsFunction,
        listUserAccountByAdminFunction,
        createUserAccountFunction,
        updateUserAccountFunction,
        deleteUserAccountFunction,
        changeUserAccountStatusFunction,
        // Platform Functions
        getPlatformsFunction,
        // Role Functions
        getRolesFunction,
      },
    });
  }
}