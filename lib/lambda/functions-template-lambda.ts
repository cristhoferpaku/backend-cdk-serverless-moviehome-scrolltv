// lib/lambda/functions/functions-template-lambda.ts
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaLayerStack } from './lambda-layer-stack';
import { ArnFunctions } from './helpers/arn-functions';

export interface LambdaProps {
  scope: Construct;
  lambdaRole: iam.Role;
  layerStack: LambdaLayerStack;
}

// 🔧 Configuración base para todas las funciones Lambda
const baseLambdaConfig = {
  runtime: lambda.Runtime.NODEJS_20_X,
  memorySize: 1024,
  timeout: Duration.seconds(30),
  architecture: lambda.Architecture.X86_64,
  bundling: {
    minify: true,
    target: 'node20',
    forceDockerBundling: false,
    esbuildArgs: {
      '--packages': 'bundle'
    },
  },
  environment: {
    NODE_ENV: 'production',
    TZ: 'America/Lima',
    STAGE: 'dev',
  },
  tracing: lambda.Tracing.ACTIVE,
};

/**
 * 🏦 Plantilla para Lambda adminLogin
 */
export const adminLoginTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const adminLoginFunction = new NodejsFunction(props.scope, 'AdminLoginFunction', {
    functionName: 'AdminLoginFunction',
    entry: 'lib/lambda/src/functions/adminLogin/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'AdminLoginFunctionArnParameter', {
    parameterName: ArnFunctions.ADMIN_LOGIN_FUNCTION_ARN,
    stringValue: adminLoginFunction.functionArn,
  });

  return adminLoginFunction;
};

/**
 * 🔄 Plantilla para Lambda refreshToken
 */
export const refreshTokenTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const refreshTokenFunction = new NodejsFunction(props.scope, 'RefreshTokenFunction', {
    functionName: 'RefreshTokenFunction',
    entry: 'lib/lambda/src/functions/refreshToken/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'RefreshTokenFunctionArnParameter', {
    parameterName: ArnFunctions.REFRESH_TOKEN_FUNCTION_ARN,
    stringValue: refreshTokenFunction.functionArn,
  });

  return refreshTokenFunction;
};


/**
 * 📋 Plantilla para Lambda listUserAdmins
 */
export const listUserAdminsTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listUserAdminsFunction = new NodejsFunction(props.scope, 'ListUserAdminsFunction', {
    functionName: 'ListUserAdminsFunction',
    entry: 'lib/lambda/src/functions/listUserAdmins/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListUserAdminsFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_USER_ADMINS_FUNCTION_ARN,
    stringValue: listUserAdminsFunction.functionArn,
  });

  return listUserAdminsFunction;
};

/**
 * 👤 Plantilla para Lambda createUserAdmin
 */
export const createUserAdminTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createUserAdminFunction = new NodejsFunction(props.scope, 'CreateUserAdminFunction', {
    functionName: 'CreateUserAdminFunction',
    entry: 'lib/lambda/src/functions/createUserAdmin/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreateUserAdminFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_USER_ADMIN_FUNCTION_ARN,
    stringValue: createUserAdminFunction.functionArn,
  });

  return createUserAdminFunction;
};

/**
 * 👤 Plantilla para Lambda getUserAdminById
 */
export const getUserAdminByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getUserAdminByIdFunction = new NodejsFunction(props.scope, 'GetUserAdminByIdFunction', {
    functionName: 'GetUserAdminByIdFunction',
    entry: 'lib/lambda/src/functions/getUserAdminById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetUserAdminByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_USER_ADMIN_BY_ID_FUNCTION_ARN,
    stringValue: getUserAdminByIdFunction.functionArn,
  });

  return getUserAdminByIdFunction;
};

/**
 * 👤 Plantilla para Lambda updateUserAdmin
 */
export const updateUserAdminTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updateUserAdminFunction = new NodejsFunction(props.scope, 'UpdateUserAdminFunction', {
    functionName: 'UpdateUserAdminFunction',
    entry: 'lib/lambda/src/functions/updateUserAdmin/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'UpdateUserAdminFunctionArnParameter', {
    parameterName: ArnFunctions.UPDATE_USER_ADMIN_FUNCTION_ARN,
    stringValue: updateUserAdminFunction.functionArn,
  });

  return updateUserAdminFunction;
};

/**
 * 👤 Plantilla para Lambda deleteUserAdmin
 */
export const deleteUserAdminTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deleteUserAdminFunction = new NodejsFunction(props.scope, 'DeleteUserAdminFunction', {
    functionName: 'DeleteUserAdminFunction',
    entry: 'lib/lambda/src/functions/deleteUserAdmin/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeleteUserAdminFunctionArnParameter', { 
    parameterName: ArnFunctions.DELETE_USER_ADMIN_FUNCTION_ARN,
    stringValue: deleteUserAdminFunction.functionArn,
  });

  return deleteUserAdminFunction;
};

/**
 * 🔄 Plantilla para Lambda changeUserAdminStatus
 */
export const changeUserAdminStatusTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const changeUserAdminStatusFunction = new NodejsFunction(props.scope, 'ChangeUserAdminStatusFunction', {
    functionName: 'ChangeUserAdminStatusFunction',
    entry: 'lib/lambda/src/functions/changeUserAdminStatus/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });


  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ChangeUserAdminStatusFunctionArnParameter', {
    parameterName: ArnFunctions.CHANGE_USER_ADMIN_STATUS_FUNCTION_ARN,
    stringValue: changeUserAdminStatusFunction.functionArn,
  });

  return changeUserAdminStatusFunction;
};

/**
 * 🏢 Plantilla para Lambda getPlatforms
 */
export const getPlatformsTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getPlatformsFunction = new NodejsFunction(props.scope, 'GetPlatformsFunction', {
    functionName: 'GetPlatformsFunction',
    entry: 'lib/lambda/src/functions/getPlatforms/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetPlatformsFunctionArnParameter', {
    parameterName: ArnFunctions.GET_PLATFORMS_FUNCTION_ARN,
    stringValue: getPlatformsFunction.functionArn,
  });

  return getPlatformsFunction;
};





/**
 * 👥 Plantilla para Lambda getRoles
 */
export const getRolesTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getRolesFunction = new NodejsFunction(props.scope, 'GetRolesFunction', {
    functionName: 'GetRolesFunction',
    entry: 'lib/lambda/src/functions/getRoles/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetRolesFunctionArnParameter', {
    parameterName: ArnFunctions.GET_ROLES_FUNCTION_ARN,
    stringValue: getRolesFunction.functionArn,
  });

  return getRolesFunction;
};

/**
 * 📦 Plantilla para Lambda createPackageSeller
 */
export const createPackageSellerTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createPackageSellerFunction = new NodejsFunction(props.scope, 'CreatePackageSellerFunction', {
    functionName: 'CreatePackageSellerFunction',
    entry: 'lib/lambda/src/functions/createPackageSeller/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreatePackageSellerFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_PACKAGE_SELLER_FUNCTION_ARN,
    stringValue: createPackageSellerFunction.functionArn,
  });

  return createPackageSellerFunction;
};

/**
 * 📋 Plantilla para Lambda createPackageType
 */
export const createPackageTypeTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createPackageTypeFunction = new NodejsFunction(props.scope, 'CreatePackageTypeFunction', {
    functionName: 'CreatePackageTypeFunction',
    entry: 'lib/lambda/src/functions/createPackageType/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreatePackageTypeFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_PACKAGE_TYPE_FUNCTION_ARN,
    stringValue: createPackageTypeFunction.functionArn,
  });

  return createPackageTypeFunction;
};

/**
 * 📋 Plantilla para Lambda listPackageTypes
 */
export const listPackageTypesTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listPackageTypesFunction = new NodejsFunction(props.scope, 'ListPackageTypesFunction', {
    functionName: 'ListPackageTypesFunction',
    entry: 'lib/lambda/src/functions/listPackageTypes/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListPackageTypesFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_PACKAGE_TYPES_FUNCTION_ARN,
    stringValue: listPackageTypesFunction.functionArn,
  });

  return listPackageTypesFunction;
};

/**
 * 📋 Plantilla para Lambda getPackageTypeById
 */
export const getPackageTypeByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getPackageTypeByIdFunction = new NodejsFunction(props.scope, 'GetPackageTypeByIdFunction', {
    functionName: 'GetPackageTypeByIdFunction',
    entry: 'lib/lambda/src/functions/getPackageTypeById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetPackageTypeByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_PACKAGE_TYPE_BY_ID_FUNCTION_ARN,
    stringValue: getPackageTypeByIdFunction.functionArn,
  });

  return getPackageTypeByIdFunction;
};

/**
 * 🗑️ Plantilla para Lambda deletePackageType
 */
export const deletePackageTypeTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deletePackageTypeFunction = new NodejsFunction(props.scope, 'DeletePackageTypeFunction', {
    functionName: 'DeletePackageTypeFunction',
    entry: 'lib/lambda/src/functions/deletePackageType/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeletePackageTypeFunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_PACKAGE_TYPE_FUNCTION_ARN,
    stringValue: deletePackageTypeFunction.functionArn,
  });

  return deletePackageTypeFunction;
};

/**
 * ✏️ Plantilla para Lambda updatePackageType
 */
export const updatePackageTypeTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updatePackageTypeFunction = new NodejsFunction(props.scope, 'UpdatePackageTypeFunction', {
    functionName: 'UpdatePackageTypeFunction',
    entry: 'lib/lambda/src/functions/updatePackageType/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'UpdatePackageTypeFunctionArnParameter', {
    parameterName: ArnFunctions.UPDATE_PACKAGE_TYPE_FUNCTION_ARN,
    stringValue: updatePackageTypeFunction.functionArn,
  });

  return updatePackageTypeFunction;
};

/**
 * 🔄 Plantilla para Lambda changePackageTypeStatus
 */
export const changePackageTypeStatusTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const changePackageTypeStatusFunction = new NodejsFunction(props.scope, 'ChangePackageTypeStatusFunction', {
    functionName: 'ChangePackageTypeStatusFunction',
    entry: 'lib/lambda/src/functions/changePackageTypeStatus/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ChangePackageTypeStatusFunctionArnParameter', {
    parameterName: ArnFunctions.CHANGE_PACKAGE_TYPE_STATUS_FUNCTION_ARN,
    stringValue: changePackageTypeStatusFunction.functionArn,
  });

  return changePackageTypeStatusFunction;
};

/**
 * 📋 Plantilla para Lambda listPackageSeller
 */
export const listPackageSellerTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listPackageSellerFunction = new NodejsFunction(props.scope, 'ListPackageSellerFunction', {
    functionName: 'ListPackageSellerFunction',
    entry: 'lib/lambda/src/functions/listPackageSeller/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListPackageSellerFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_PACKAGE_SELLER_FUNCTION_ARN,
    stringValue: listPackageSellerFunction.functionArn,
  });

  return listPackageSellerFunction;
};

/**
 * 📋 Plantilla para Lambda getPackageSellerById
 */
export const getPackageSellerByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getPackageSellerByIdFunction = new NodejsFunction(props.scope, 'GetPackageSellerByIdFunction', {
    functionName: 'GetPackageSellerByIdFunction',
    entry: 'lib/lambda/src/functions/getPackageSellerById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetPackageSellerByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_PACKAGE_SELLER_BY_ID_FUNCTION_ARN,
    stringValue: getPackageSellerByIdFunction.functionArn,
  });

  return getPackageSellerByIdFunction;
};

/**
 * ✏️ Plantilla para Lambda updatePackageSeller
 */
export const updatePackageSellerTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updatePackageSellerFunction = new NodejsFunction(props.scope, 'UpdatePackageSellerFunction', {
    functionName: 'UpdatePackageSellerFunction',
    entry: 'lib/lambda/src/functions/updatePackageSeller/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'UpdatePackageSellerFunctionArnParameter', {
    parameterName: ArnFunctions.UPDATE_PACKAGE_SELLER_FUNCTION_ARN,
    stringValue: updatePackageSellerFunction.functionArn,
  });

  return updatePackageSellerFunction;
};

/**
 * 📋 Plantilla para Lambda deletePackageSeller
 */
export const deletePackageSellerTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deletePackageSellerFunction = new NodejsFunction(props.scope, 'DeletePackageSellerFunction', {
    functionName: 'DeletePackageSellerFunction',
    entry: 'lib/lambda/src/functions/deletePackageSeller/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeletePackageSellerFunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_PACKAGE_SELLER_FUNCTION_ARN,
    stringValue: deletePackageSellerFunction.functionArn,
  });

  return deletePackageSellerFunction;
};

export const changePackageSellerStatusTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const changePackageSellerStatusFunction = new NodejsFunction(props.scope, 'ChangePackageSellerStatusFunction', {
    functionName: 'ChangePackageSellerStatusFunction',
    entry: 'lib/lambda/src/functions/changePackageSellerStatus/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ChangePackageSellerStatusFunctionArnParameter', {
    parameterName: ArnFunctions.CHANGE_PACKAGE_SELLER_STATUS_FUNCTION_ARN,
    stringValue: changePackageSellerStatusFunction.functionArn,
  });

  return changePackageSellerStatusFunction;
};

/**
 * 📦 Plantilla para Lambda createPackageUser
 */
export const createPackageUserTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createPackageUserFunction = new NodejsFunction(props.scope, 'CreatePackageUserFunction', {
    functionName: 'CreatePackageUserFunction',
    entry: 'lib/lambda/src/functions/createPackageUser/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreatePackageUserFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_PACKAGE_USER_FUNCTION_ARN,
    stringValue: createPackageUserFunction.functionArn,
  });

  return createPackageUserFunction;
};

/**
 * 📦 Plantilla para Lambda getPackageUserById
 */
export const getPackageUserByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getPackageUserByIdFunction = new NodejsFunction(props.scope, 'GetPackageUserByIdFunction', {
    functionName: 'GetPackageUserByIdFunction',
    entry: 'lib/lambda/src/functions/getPackageUserById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetPackageUserByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_PACKAGE_USER_BY_ID_FUNCTION_ARN,
    stringValue: getPackageUserByIdFunction.functionArn,
  });

  return getPackageUserByIdFunction;
};

/**
 * 📋 Plantilla para Lambda listPackageUsers
 */
export const listPackageUsersTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listPackageUsersFunction = new NodejsFunction(props.scope, 'ListPackageUsersFunction', {
    functionName: 'ListPackageUsersFunction',
    entry: 'lib/lambda/src/functions/listPackageUsers/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListPackageUsersFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_PACKAGE_USERS_FUNCTION_ARN,
    stringValue: listPackageUsersFunction.functionArn,
  });

  return listPackageUsersFunction;
};

/**
 * 📋 Plantilla para Lambda updatePackageUser
 */
export const updatePackageUserTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updatePackageUserFunction = new NodejsFunction(props.scope, 'UpdatePackageUserFunction', {
    functionName: 'UpdatePackageUserFunction',
    entry: 'lib/lambda/src/functions/updatePackageUser/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'UpdatePackageUserFunctionArnParameter', {
    parameterName: ArnFunctions.UPDATE_PACKAGE_USER_FUNCTION_ARN,
    stringValue: updatePackageUserFunction.functionArn,
  });

  return updatePackageUserFunction;
};

/**
 * 📋 Plantilla para Lambda deletePackageUser
 */
export const deletePackageUserTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deletePackageUserFunction = new NodejsFunction(props.scope, 'DeletePackageUserFunction', {
    functionName: 'DeletePackageUserFunction',
    entry: 'lib/lambda/src/functions/deletePackageUser/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeletePackageUserFunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_PACKAGE_USER_FUNCTION_ARN,
    stringValue: deletePackageUserFunction.functionArn,
  });

  return deletePackageUserFunction;
};

/**
 * 📋 Plantilla para Lambda changePackageUserStatus
 */
export const changePackageUserStatusTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const changePackageUserStatusFunction = new NodejsFunction(props.scope, 'ChangePackageUserStatusFunction', {
    functionName: 'ChangePackageUserStatusFunction',
    entry: 'lib/lambda/src/functions/changePackageUserStatus/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ChangePackageUserStatusFunctionArnParameter', {
    parameterName: ArnFunctions.CHANGE_PACKAGE_USER_STATUS_FUNCTION_ARN,
    stringValue: changePackageUserStatusFunction.functionArn,
  });

  return changePackageUserStatusFunction;
};

/**
 * 📋 Plantilla para Lambda listPackageTypesActive
 */
export const listPackageTypesActiveTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listPackageTypesActiveFunction = new NodejsFunction(props.scope, 'ListPackageTypesActiveFunction', {
    functionName: 'ListPackageTypesActiveFunction',
    entry: 'lib/lambda/src/functions/listPackageTypesActive/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListPackageTypesActiveFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_PACKAGE_TYPES_ACTIVE_FUNCTION_ARN,
    stringValue: listPackageTypesActiveFunction.functionArn,
  });

  return listPackageTypesActiveFunction;
};


/**
 * 📋 Plantilla para Lambda createUserAccount
 */
export const createUserAccountTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createUserAccountFunction = new NodejsFunction(props.scope, 'CreateUserAccountFunction', {
    functionName: 'CreateUserAccountFunction',
    entry: 'lib/lambda/src/functions/createUserAccount/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreateUserAccountFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_USER_ACCOUNT_FUNCTION_ARN,
    stringValue: createUserAccountFunction.functionArn,
  });

  return createUserAccountFunction;
};

/**
 * 📋 Plantilla para Lambda getUserAccountById
 */
export const getUserAccountByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getUserAccountByIdFunction = new NodejsFunction(props.scope, 'GetUserAccountByIdFunction', {
    functionName: 'GetUserAccountByIdFunction',
    entry: 'lib/lambda/src/functions/getUserAccountById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetUserAccountByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_USER_ACCOUNT_BY_ID_FUNCTION_ARN,
    stringValue: getUserAccountByIdFunction.functionArn,
  });

  return getUserAccountByIdFunction;
};

/**
 * 📋 Plantilla para Lambda listUserAccounts
 */
export const listUserAccountsTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listUserAccountsFunction = new NodejsFunction(props.scope, 'ListUserAccountsFunction', {
    functionName: 'ListUserAccountsFunction',
    entry: 'lib/lambda/src/functions/listUserAccounts/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListUserAccountsFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_USER_ACCOUNTS_FUNCTION_ARN, 
    stringValue: listUserAccountsFunction.functionArn,
  });

  return listUserAccountsFunction;
};

/**
 * 📋 Plantilla para Lambda updateUserAccount
 */
export const updateUserAccountTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updateUserAccountFunction = new NodejsFunction(props.scope, 'UpdateUserAccountFunction', {
   functionName: 'UpdateUserAccountFunction',
   entry: 'lib/lambda/src/functions/updateUserAccount/handler.ts',
   handler: 'handler',
   role: props.lambdaRole,
   layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
   ...baseLambdaConfig,
 });

 // Registrar ARN en SSM
 new ssm.StringParameter(props.scope, 'UpdateUserAccountFunctionArnParameter', {
   parameterName: ArnFunctions.UPDATE_USER_ACCOUNT_FUNCTION_ARN,
   stringValue: updateUserAccountFunction.functionArn,
 });

 return updateUserAccountFunction;
};



/**
 * 📋 Plantilla para Lambda deleteUserAccount
 */
export const deleteUserAccountTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deleteUserAccountFunction = new NodejsFunction(props.scope, 'DeleteUserAccountFunction', {
    functionName: 'DeleteUserAccountFunction',
    entry: 'lib/lambda/src/functions/deleteUserAccount/handler.ts',

    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeleteUserAccountFunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_USER_ACCOUNT_FUNCTION_ARN,
    stringValue: deleteUserAccountFunction.functionArn,
  });

  return deleteUserAccountFunction;
};


/**
 * 📋 Plantilla para Lambda changeUserAccountStatus
 */
export const changeUserAccountStatusTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const changeUserAccountStatusFunction = new NodejsFunction(props.scope, 'ChangeUserAccountStatusFunction', {
    functionName: 'ChangeUserAccountStatusFunction',
    entry: 'lib/lambda/src/functions/changeUserAccountStatus/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ChangeUserAccountStatusFunctionArnParameter', {
    parameterName: ArnFunctions.CHANGE_USER_ACCOUNT_STATUS_FUNCTION_ARN,    
    stringValue: changeUserAccountStatusFunction.functionArn,
  });

  return changeUserAccountStatusFunction;
};

/**
 * 📋 Plantilla para Lambda listUserAccountByAdmin
 */
export const listUserAccountByAdminTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listUserAccountByAdminFunction = new NodejsFunction(props.scope, 'ListUserAccountByAdminFunction', {
    functionName: 'ListUserAccountByAdminFunction',
    entry: 'lib/lambda/src/functions/listUserAccountByAdmin/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListUserAccountByAdminFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_USER_ACCOUNT_BY_ADMIN_FUNCTION_ARN,
    stringValue: listUserAccountByAdminFunction.functionArn,
  });

  return listUserAccountByAdminFunction;
};





