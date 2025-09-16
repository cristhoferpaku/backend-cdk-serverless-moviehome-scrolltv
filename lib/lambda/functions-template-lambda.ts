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
  },
  environment: {
    NODE_ENV: 'production',
    TZ: 'America/Lima',
    STAGE: 'prod',
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
export const refreshTokenClientTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const refreshTokenClientFunction = new NodejsFunction(props.scope, 'RefreshTokenClientFunction', {
    functionName: 'RefreshTokenClientFunction',
    entry: 'lib/lambda/src/functions/refreshTokenClient/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'RefreshTokenClientFunctionArnParameter', {
    parameterName: ArnFunctions.REFRESH_TOKEN_CLIENT_FUNCTION_ARN,
    stringValue: refreshTokenClientFunction.functionArn,
  });

  return refreshTokenClientFunction;
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

/**
 * 💳 Plantilla para Lambda assignSellerCredit
 */
export const assignSellerCreditTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const assignSellerCreditFunction = new NodejsFunction(props.scope, 'AssignSellerCreditFunction', {
    functionName: 'AssignSellerCreditFunction',
    entry: 'lib/lambda/src/functions/assignSellerCredit/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'AssignSellerCreditFunctionArnParameter', {
    parameterName: ArnFunctions.ASSIGN_SELLER_CREDIT_FUNCTION_ARN,
    stringValue: assignSellerCreditFunction.functionArn,
  });

  return assignSellerCreditFunction;
};

/**
 * 📁 Plantilla para Lambda createResource
 */
export const createResourceTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createResourceFunction = new NodejsFunction(props.scope, 'CreateResourceFunction', {
    functionName: 'CreateResourceFunction',
    entry: 'lib/lambda/src/functions/createResource/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreateResourceFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_RESOURCE_FUNCTION_ARN,
    stringValue: createResourceFunction.functionArn,
  });

  return createResourceFunction;
};

/**
 * 📋 Plantilla para Lambda listResource
 */
export const listResourceTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listResourceFunction = new NodejsFunction(props.scope, 'ListResourceFunction', {
    functionName: 'ListResourceFunction',
    entry: 'lib/lambda/src/functions/listResource/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListResourceFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_RESOURCE_FUNCTION_ARN,
    stringValue: listResourceFunction.functionArn,
  });

  return listResourceFunction;
};

/**
 * 📋 Plantilla para Lambda getResourceById
 */
export const getResourceByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getResourceByIdFunction = new NodejsFunction(props.scope, 'GetResourceByIdFunction', {
    functionName: 'GetResourceByIdFunction',
    entry: 'lib/lambda/src/functions/getResourceById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetResourceByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_RESOURCE_BY_ID_FUNCTION_ARN,
    stringValue: getResourceByIdFunction.functionArn,
  });

  return getResourceByIdFunction;
};

/**
 * 🔄 Plantilla para Lambda changeResourceState
 */
export const changeResourceStateTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const changeResourceStateFunction = new NodejsFunction(props.scope, 'ChangeResourceStateFunction', {
    functionName: 'ChangeResourceStateFunction',
    entry: 'lib/lambda/src/functions/changeResourceState/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ChangeResourceStateFunctionArnParameter', {
    parameterName: ArnFunctions.CHANGE_RESOURCE_STATE_FUNCTION_ARN,
    stringValue: changeResourceStateFunction.functionArn,
  });

  return changeResourceStateFunction;
};

/**
 * 🗑️ Plantilla para Lambda deleteResource
 */
export const deleteResourceTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deleteResourceFunction = new NodejsFunction(props.scope, 'DeleteResourceFunction', {
    functionName: 'DeleteResourceFunction',
    entry: 'lib/lambda/src/functions/deleteResource/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeleteResourceFunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_RESOURCE_FUNCTION_ARN,
    stringValue: deleteResourceFunction.functionArn,
  });

  return deleteResourceFunction;
};

/**
 * ✏️ Plantilla para Lambda updateResource
 */
export const updateResourceTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updateResourceFunction = new NodejsFunction(props.scope, 'UpdateResourceFunction', {
    functionName: 'UpdateResourceFunction',
    entry: 'lib/lambda/src/functions/updateResource/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'UpdateResourceFunctionArnParameter', {
    parameterName: ArnFunctions.UPDATE_RESOURCE_FUNCTION_ARN,
    stringValue: updateResourceFunction.functionArn,
  });

  return updateResourceFunction;
};

/**
 * 💰 Plantilla para Lambda getSellerCreditById
 */
export const getSellerCreditByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getSellerCreditByIdFunction = new NodejsFunction(props.scope, 'GetSellerCreditByIdFunction', {
    functionName: 'GetSellerCreditByIdFunction',
    entry: 'lib/lambda/src/functions/getSellerCreditById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetSellerCreditByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_SELLER_CREDIT_BY_ID_FUNCTION_ARN,
    stringValue: getSellerCreditByIdFunction.functionArn,
  });

  return getSellerCreditByIdFunction;
};

/**
 * 🎭 Plantilla para Lambda listCastMembers
 */
export const listCastMembersTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listCastMembersFunction = new NodejsFunction(props.scope, 'ListCastMembersFunction', {
    functionName: 'ListCastMembersFunction',
    entry: 'lib/lambda/src/functions/listCastMembers/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListCastMembersFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_CAST_MEMBERS_FUNCTION_ARN,
    stringValue: listCastMembersFunction.functionArn,
  });

  return listCastMembersFunction;
};

/**
 * 👤 Plantilla para Lambda getCastMemberById
 */
export const getCastMemberByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getCastMemberByIdFunction = new NodejsFunction(props.scope, 'GetCastMemberByIdFunction', {
    functionName: 'GetCastMemberByIdFunction',
    entry: 'lib/lambda/src/functions/getCastMemberById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetCastMemberByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_CAST_MEMBER_BY_ID_FUNCTION_ARN,
    stringValue: getCastMemberByIdFunction.functionArn,
  });

  return getCastMemberByIdFunction;
};

/**
 * ➕ Plantilla para Lambda createCastMember
 */
export const createCastMemberTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createCastMemberFunction = new NodejsFunction(props.scope, 'CreateCastMemberFunction', {
    functionName: 'CreateCastMemberFunction',
    entry: 'lib/lambda/src/functions/createCastMember/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreateCastMemberFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_CAST_MEMBER_FUNCTION_ARN,
    stringValue: createCastMemberFunction.functionArn,
  });

  return createCastMemberFunction;
};

/**
 * ✏️ Plantilla para Lambda updateCastMember
 */
export const updateCastMemberTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updateCastMemberFunction = new NodejsFunction(props.scope, 'UpdateCastMemberFunction', {
    functionName: 'UpdateCastMemberFunction',
    entry: 'lib/lambda/src/functions/updateCastMember/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'UpdateCastMemberFunctionArnParameter', {
    parameterName: ArnFunctions.UPDATE_CAST_MEMBER_FUNCTION_ARN,
    stringValue: updateCastMemberFunction.functionArn,
  });

  return updateCastMemberFunction;
};

/**
 * 🗑️ Plantilla para Lambda deleteCastMember
 */
export const deleteCastMemberTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deleteCastMemberFunction = new NodejsFunction(props.scope, 'DeleteCastMemberFunction', {
    functionName: 'DeleteCastMemberFunction',
    entry: 'lib/lambda/src/functions/deleteCastMember/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeleteCastMemberFunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_CAST_MEMBER_FUNCTION_ARN,
    stringValue: deleteCastMemberFunction.functionArn,
  });

  return deleteCastMemberFunction;
};

/**
 * 🌍 Plantilla para Lambda listAllCountries
 */
export const listAllCountriesTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listAllCountriesFunction = new NodejsFunction(props.scope, 'ListAllCountriesFunction', {
    functionName: 'ListAllCountriesFunction',
    entry: 'lib/lambda/src/functions/listAllCountries/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListAllCountriesFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_ALL_COUNTRIES_FUNCTION_ARN,
    stringValue: listAllCountriesFunction.functionArn,
  });

  return listAllCountriesFunction;
};

/**
 * 📋 Plantilla para Lambda getAllSections
 */
export const getAllSectionsTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getAllSectionsFunction = new NodejsFunction(props.scope, 'GetAllSectionsFunction', {
    functionName: 'GetAllSectionsFunction',
    entry: 'lib/lambda/src/functions/getAllSections/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetAllSectionsFunctionArnParameter', {
    parameterName: ArnFunctions.GET_ALL_SECTIONS_FUNCTION_ARN,
    stringValue: getAllSectionsFunction.functionArn,
  });

  return getAllSectionsFunction;
};

/**
 * 📋 Plantilla para Lambda listCollections
 */
export const listCollectionsTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listCollectionsFunction = new NodejsFunction(props.scope, 'ListCollectionsFunction', {
    functionName: 'ListCollectionsFunction',
    entry: 'lib/lambda/src/functions/listCollections/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListCollectionsFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_COLLECTIONS_FUNCTION_ARN,
    stringValue: listCollectionsFunction.functionArn,
  });

  return listCollectionsFunction;
};

/**
 * 📋 Plantilla para Lambda getCollectionById
 */
export const getCollectionByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getCollectionByIdFunction = new NodejsFunction(props.scope, 'GetCollectionByIdFunction', {
    functionName: 'GetCollectionByIdFunction',
    entry: 'lib/lambda/src/functions/getCollectionById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetCollectionByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_COLLECTION_BY_ID_FUNCTION_ARN,
    stringValue: getCollectionByIdFunction.functionArn,
  });

  return getCollectionByIdFunction;
};

/**
 * 📋 Plantilla para Lambda createCollection
 */
export const createCollectionTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createCollectionFunction = new NodejsFunction(props.scope, 'CreateCollectionFunction', {
    functionName: 'CreateCollectionFunction',
    entry: 'lib/lambda/src/functions/createCollection/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreateCollectionFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_COLLECTION_FUNCTION_ARN,
    stringValue: createCollectionFunction.functionArn,
  });

  return createCollectionFunction;
};

/**
 * 📋 Plantilla para Lambda updateCollection
 */
export const updateCollectionTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updateCollectionFunction = new NodejsFunction(props.scope, 'UpdateCollectionFunction', {
    functionName: 'UpdateCollectionFunction',
    entry: 'lib/lambda/src/functions/updateCollection/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'UpdateCollectionFunctionArnParameter', {
    parameterName: ArnFunctions.UPDATE_COLLECTION_FUNCTION_ARN,
    stringValue: updateCollectionFunction.functionArn,
  });

  return updateCollectionFunction;
};

/**
 * 📋 Plantilla para Lambda deleteCollection
 */
export const deleteCollectionTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deleteCollectionFunction = new NodejsFunction(props.scope, 'DeleteCollectionFunction', {
    functionName: 'DeleteCollectionFunction',
    entry: 'lib/lambda/src/functions/deleteCollection/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeleteCollectionFunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_COLLECTION_FUNCTION_ARN,
    stringValue: deleteCollectionFunction.functionArn,
  });

  return deleteCollectionFunction;
};

/**
 * 📋 Plantilla para Lambda changeCollectionStatus
 */
export const changeCollectionStatusTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const changeCollectionStatusFunction = new NodejsFunction(props.scope, 'ChangeCollectionStatusFunction', {
    functionName: 'ChangeCollectionStatusFunction',
    entry: 'lib/lambda/src/functions/changeCollectionStatus/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ChangeCollectionStatusFunctionArnParameter', {
    parameterName: ArnFunctions.CHANGE_COLLECTION_STATUS_FUNCTION_ARN,
    stringValue: changeCollectionStatusFunction.functionArn,
  });

  return changeCollectionStatusFunction;
};

/**
 * 📋 Plantilla para Lambda getAllCollections
 */
export const getAllCollectionsTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getAllCollectionsFunction = new NodejsFunction(props.scope, 'GetAllCollectionsFunction', {
    functionName: 'GetAllCollectionsFunction',
    entry: 'lib/lambda/src/functions/getAllCollections/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetAllCollectionsFunctionArnParameter', {
    parameterName: ArnFunctions.GET_ALL_COLLECTIONS_FUNCTION_ARN,
    stringValue: getAllCollectionsFunction.functionArn,
  });

  return getAllCollectionsFunction;
};

/**
 * 📋 Plantilla para Lambda listMultimediaCategories
 */
export const listMultimediaCategoriesTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listMultimediaCategoriesFunction = new NodejsFunction(props.scope, 'ListMultimediaCategoriesFunction', {
    functionName: 'ListMultimediaCategoriesFunction',
    entry: 'lib/lambda/src/functions/listMultimediaCategories/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListMultimediaCategoriesFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_MULTIMEDIA_CATEGORIES_FUNCTION_ARN,
    stringValue: listMultimediaCategoriesFunction.functionArn,
  });

  return listMultimediaCategoriesFunction;
};

/**
 * 📋 Plantilla para Lambda getMultimediaCategoryById
 */
export const getMultimediaCategoryByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getMultimediaCategoryByIdFunction = new NodejsFunction(props.scope, 'GetMultimediaCategoryByIdFunction', {
    functionName: 'GetMultimediaCategoryByIdFunction',
    entry: 'lib/lambda/src/functions/getMultimediaCategoryById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetMultimediaCategoryByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_MULTIMEDIA_CATEGORY_BY_ID_FUNCTION_ARN,
    stringValue: getMultimediaCategoryByIdFunction.functionArn,
  });

  return getMultimediaCategoryByIdFunction;
};

/**
 * 📋 Plantilla para Lambda createMultimediaCategory
 */
export const createMultimediaCategoryTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createMultimediaCategoryFunction = new NodejsFunction(props.scope, 'CreateMultimediaCategoryFunction', {
    functionName: 'CreateMultimediaCategoryFunction',
    entry: 'lib/lambda/src/functions/createMultimediaCategory/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreateMultimediaCategoryFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_MULTIMEDIA_CATEGORY_FUNCTION_ARN,
    stringValue: createMultimediaCategoryFunction.functionArn,
  });

  return createMultimediaCategoryFunction;
};

/**
 * 📋 Plantilla para Lambda updateMultimediaCategory
 */
export const updateMultimediaCategoryTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updateMultimediaCategoryFunction = new NodejsFunction(props.scope, 'UpdateMultimediaCategoryFunction', {
    functionName: 'UpdateMultimediaCategoryFunction',
    entry: 'lib/lambda/src/functions/updateMultimediaCategory/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'UpdateMultimediaCategoryFunctionArnParameter', {
    parameterName: ArnFunctions.UPDATE_MULTIMEDIA_CATEGORY_FUNCTION_ARN,
    stringValue: updateMultimediaCategoryFunction.functionArn,
  });

  return updateMultimediaCategoryFunction;
};

/**
 * 📋 Plantilla para Lambda deleteMultimediaCategory
 */
export const deleteMultimediaCategoryTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deleteMultimediaCategoryFunction = new NodejsFunction(props.scope, 'DeleteMultimediaCategoryFunction', {
    functionName: 'DeleteMultimediaCategoryFunction',
    entry: 'lib/lambda/src/functions/deleteMultimediaCategory/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeleteMultimediaCategoryFunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_MULTIMEDIA_CATEGORY_FUNCTION_ARN,
    stringValue: deleteMultimediaCategoryFunction.functionArn,
  });

  return deleteMultimediaCategoryFunction;
};

/**
 * 📋 Plantilla para Lambda changeMultimediaCategoryStatus
 */
export const changeMultimediaCategoryStatusTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const changeMultimediaCategoryStatusFunction = new NodejsFunction(props.scope, 'ChangeMultimediaCategoryStatusFunction', {
    functionName: 'ChangeMultimediaCategoryStatusFunction',
    entry: 'lib/lambda/src/functions/changeMultimediaCategoryStatus/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ChangeMultimediaCategoryStatusFunctionArnParameter', {
    parameterName: ArnFunctions.CHANGE_MULTIMEDIA_CATEGORY_STATUS_FUNCTION_ARN,
    stringValue: changeMultimediaCategoryStatusFunction.functionArn,
  });

  return changeMultimediaCategoryStatusFunction;
};

/**
 * 📋 Plantilla para Lambda getAllMultimediaCategories
 */
export const getAllMultimediaCategoriesTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getAllMultimediaCategoriesFunction = new NodejsFunction(props.scope, 'GetAllMultimediaCategoriesFunction', {
    functionName: 'GetAllMultimediaCategoriesFunction',
    entry: 'lib/lambda/src/functions/getAllMultimediaCategories/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetAllMultimediaCategoriesFunctionArnParameter', {
    parameterName: ArnFunctions.GET_ALL_MULTIMEDIA_CATEGORIES_FUNCTION_ARN,
    stringValue: getAllMultimediaCategoriesFunction.functionArn,
  });

  return getAllMultimediaCategoriesFunction;
};

/**
 * 🎬 Plantilla para Lambda createMovie
 */
export const createMovieTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createMovieFunction = new NodejsFunction(props.scope, 'CreateMovieFunction', {
    functionName: 'CreateMovieFunction',
    entry: 'lib/lambda/src/functions/createMovie/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreateMovieFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_MOVIE_FUNCTION_ARN,
    stringValue: createMovieFunction.functionArn,
  });

  return createMovieFunction;
};

/**
 * 🎬 Plantilla para Lambda getMovieById
 */
export const getMovieByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getMovieByIdFunction = new NodejsFunction(props.scope, 'GetMovieByIdFunction', {
    functionName: 'GetMovieByIdFunction',
    entry: 'lib/lambda/src/functions/getMovieById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetMovieByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_MOVIE_BY_ID_FUNCTION_ARN,
    stringValue: getMovieByIdFunction.functionArn,
  });

  return getMovieByIdFunction;
};

/**
 * 🎬 Plantilla para Lambda listMultimedia
 */
export const listMultimediaTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listMultimediaFunction = new NodejsFunction(props.scope, 'ListMultimediaFunction', {
    functionName: 'ListMultimediaFunction',
    entry: 'lib/lambda/src/functions/listMultimedia/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListMultimediaFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_MULTIMEDIA_FUNCTION_ARN,
    stringValue: listMultimediaFunction.functionArn,
  });

  return listMultimediaFunction;
};

/**
 * 🎬 Plantilla para Lambda deleteMovie
 */
export const deleteMovieTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deleteMovieFunction = new NodejsFunction(props.scope, 'DeleteMovieFunction', {
    functionName: 'DeleteMovieFunction',
    entry: 'lib/lambda/src/functions/deleteMovie/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeleteMovieFunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_MOVIE_FUNCTION_ARN,
    stringValue: deleteMovieFunction.functionArn,
  });

  return deleteMovieFunction;
};

/**
 * 🎬 Plantilla para Lambda changeMovieStatus
 */
export const changeMovieStatusTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const changeMovieStatusFunction = new NodejsFunction(props.scope, 'ChangeMovieStatusFunction', {
    functionName: 'ChangeMovieStatusFunction',
    entry: 'lib/lambda/src/functions/changeMovieStatus/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ChangeMovieStatusFunctionArnParameter', {
    parameterName: ArnFunctions.CHANGE_MOVIE_STATUS_FUNCTION_ARN,
    stringValue: changeMovieStatusFunction.functionArn,
  });

  return changeMovieStatusFunction;
};

/**
 * 🎬 Plantilla para Lambda updateMovie
 */
export const updateMovieTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updateMovieFunction = new NodejsFunction(props.scope, 'UpdateMovieFunction', {
    functionName: 'UpdateMovieFunction',
    entry: 'lib/lambda/src/functions/updateMovie/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'UpdateMovieFunctionArnParameter', {
    parameterName: ArnFunctions.UPDATE_MOVIE_FUNCTION_ARN,
    stringValue: updateMovieFunction.functionArn,
  });

  return updateMovieFunction;
};

/**
 * 📺 Plantilla para Lambda createSeries
 */
export const createSeriesTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createSeriesFunction = new NodejsFunction(props.scope, 'CreateSeriesFunction', {
    functionName: 'CreateSeriesFunction',
    entry: 'lib/lambda/src/functions/createSeries/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreateSeriesFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_SERIES_FUNCTION_ARN,
    stringValue: createSeriesFunction.functionArn,
  });

  return createSeriesFunction;
};

/**
 * 📺 Plantilla para Lambda getSeriesById
 */
export const getSeriesByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getSeriesByIdFunction = new NodejsFunction(props.scope, 'GetSeriesByIdFunction', {
    functionName: 'GetSeriesByIdFunction',
    entry: 'lib/lambda/src/functions/getSeriesById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetSeriesByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_SERIES_BY_ID_FUNCTION_ARN,
    stringValue: getSeriesByIdFunction.functionArn,
  });

  return getSeriesByIdFunction;
};


/**
 * 📺 Plantilla para Lambda deleteSeries
 */
export const deleteSeriesTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deleteSeriesFunction = new NodejsFunction(props.scope, 'DeleteSeriesFunction', {
    functionName: 'DeleteSeriesFunction',
    entry: 'lib/lambda/src/functions/deleteSeries/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeleteSeriesFunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_SERIES_FUNCTION_ARN,
    stringValue: deleteSeriesFunction.functionArn,
  });

  return deleteSeriesFunction;
};

/**
 * 📺 Plantilla para Lambda changeSeriesStatus
 */
export const changeSeriesStatusTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const changeSeriesStatusFunction = new NodejsFunction(props.scope, 'ChangeSeriesStatusFunction', {
    functionName: 'ChangeSeriesStatusFunction',
    entry: 'lib/lambda/src/functions/changeSeriesStatus/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ChangeSeriesStatusFunctionArnParameter', {
    parameterName: ArnFunctions.CHANGE_SERIES_STATUS_FUNCTION_ARN,
    stringValue: changeSeriesStatusFunction.functionArn,
  });

  return changeSeriesStatusFunction;
};

/**
 * 📺 Plantilla para Lambda updateSeries
 */
export const updateSeriesTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updateSeriesFunction = new NodejsFunction(props.scope, 'UpdateSeriesFunction', {
    functionName: 'UpdateSeriesFunction',
    entry: 'lib/lambda/src/functions/updateSeries/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'UpdateSeriesFunctionArnParameter', {
    parameterName: ArnFunctions.UPDATE_SERIES_FUNCTION_ARN,
    stringValue: updateSeriesFunction.functionArn,
  });

  return updateSeriesFunction;
};

/**
 * 🗓️ Plantilla para Lambda createSeason
 */
export const createSeasonTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createSeasonFunction = new NodejsFunction(props.scope, 'CreateSeasonFunction', {
    functionName: 'CreateSeasonFunction',
    entry: 'lib/lambda/src/functions/createSeason/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreateSeasonFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_SEASON_FUNCTION_ARN,
    stringValue: createSeasonFunction.functionArn,
  });

  return createSeasonFunction;
};

/**
 * 🗓️ Plantilla para Lambda getSeasonById
 */
export const getSeasonByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getSeasonByIdFunction = new NodejsFunction(props.scope, 'GetSeasonByIdFunction', {
    functionName: 'GetSeasonByIdFunction',
    entry: 'lib/lambda/src/functions/getSeasonById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetSeasonByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_SEASON_BY_ID_FUNCTION_ARN,
    stringValue: getSeasonByIdFunction.functionArn,
  });

  return getSeasonByIdFunction;
};

/**
 * 🗓️ Plantilla para Lambda listSeasons
 */
export const listSeasonsTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listSeasonsFunction = new NodejsFunction(props.scope, 'ListSeasonsFunction', {
    functionName: 'ListSeasonsFunction',
    entry: 'lib/lambda/src/functions/listSeasons/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListSeasonsFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_SEASONS_FUNCTION_ARN,
    stringValue: listSeasonsFunction.functionArn,
  });

  return listSeasonsFunction;
};

/**
 * 🗓️ Plantilla para Lambda deleteSeason
 */
export const deleteSeasonTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deleteSeasonFunction = new NodejsFunction(props.scope, 'DeleteSeasonFunction', {
    functionName: 'DeleteSeasonFunction',
    entry: 'lib/lambda/src/functions/deleteSeason/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeleteSeasonFunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_SEASON_FUNCTION_ARN,
    stringValue: deleteSeasonFunction.functionArn,
  });

  return deleteSeasonFunction;
};


/**
 * 🗓️ Plantilla para Lambda updateSeason
 */
export const updateSeasonTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updateSeasonFunction = new NodejsFunction(props.scope, 'UpdateSeasonFunction', {
    functionName: 'UpdateSeasonFunction',
    entry: 'lib/lambda/src/functions/updateSeason/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'UpdateSeasonFunctionArnParameter', {
    parameterName: ArnFunctions.UPDATE_SEASON_FUNCTION_ARN,
    stringValue: updateSeasonFunction.functionArn,
  });

  return updateSeasonFunction;
};

/**
 * 📺 Plantilla para Lambda createEpisode
 */
export const createEpisodeTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createEpisodeFunction = new NodejsFunction(props.scope, 'CreateEpisodeFunction', {
    functionName: 'CreateEpisodeFunction',
    entry: 'lib/lambda/src/functions/createEpisode/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreateEpisodeFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_EPISODE_FUNCTION_ARN,
    stringValue: createEpisodeFunction.functionArn,
  });

  return createEpisodeFunction;
};

/**
 * 📺 Plantilla para Lambda getEpisodeById
 */
export const getEpisodeByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getEpisodeByIdFunction = new NodejsFunction(props.scope, 'GetEpisodeByIdFunction', {
    functionName: 'GetEpisodeByIdFunction',
    entry: 'lib/lambda/src/functions/getEpisodeById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetEpisodeByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_EPISODE_BY_ID_FUNCTION_ARN,
    stringValue: getEpisodeByIdFunction.functionArn,
  });

  return getEpisodeByIdFunction;
};

/**
 * 📺 Plantilla para Lambda listEpisodes
 */
export const listEpisodesTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listEpisodesFunction = new NodejsFunction(props.scope, 'ListEpisodesFunction', {
    functionName: 'ListEpisodesFunction',
    entry: 'lib/lambda/src/functions/listEpisodes/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListEpisodesFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_EPISODES_FUNCTION_ARN,
    stringValue: listEpisodesFunction.functionArn,
  });

  return listEpisodesFunction;
};

/**
 * 📺 Plantilla para Lambda deleteEpisode
 */
export const deleteEpisodeTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deleteEpisodeFunction = new NodejsFunction(props.scope, 'DeleteEpisodeFunction', {
    functionName: 'DeleteEpisodeFunction',
    entry: 'lib/lambda/src/functions/deleteEpisode/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeleteEpisodeFunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_EPISODE_FUNCTION_ARN,
    stringValue: deleteEpisodeFunction.functionArn,
  });

  return deleteEpisodeFunction;
};

/**
 * 📺 Plantilla para Lambda updateEpisode
 */
export const updateEpisodeTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updateEpisodeFunction = new NodejsFunction(props.scope, 'UpdateEpisodeFunction', {
    functionName: 'UpdateEpisodeFunction',
    entry: 'lib/lambda/src/functions/updateEpisode/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'UpdateEpisodeFunctionArnParameter', {
    parameterName: ArnFunctions.UPDATE_EPISODE_FUNCTION_ARN,
    stringValue: updateEpisodeFunction.functionArn,
  });

  return updateEpisodeFunction;
};

/**
 * 🔐 Plantilla para Lambda getVideoSignature
 */
export const getVideoSignatureTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getVideoSignatureFunction = new NodejsFunction(props.scope, 'GetVideoSignatureFunction', {
    functionName: 'GetVideoSignatureFunction',
    entry: 'lib/lambda/src/functions/getVideoSignature/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetVideoSignatureFunctionArnParameter', {
    parameterName: ArnFunctions.GET_VIDEO_SIGNATURE_FUNCTION_ARN,
    stringValue: getVideoSignatureFunction.functionArn,
  });

  return getVideoSignatureFunction;
};

/**
 * 🏆 Plantilla para Lambda listTop10
 */
export const listTop10TemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listTop10Function = new NodejsFunction(props.scope, 'ListTop10Function', {
    functionName: 'ListTop10Function',
    entry: 'lib/lambda/src/functions/listTop10/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListTop10FunctionArnParameter', {
    parameterName: ArnFunctions.LIST_TOP10_FUNCTION_ARN,
    stringValue: listTop10Function.functionArn,
  });

  return listTop10Function;
};

/**
 * 🏆 Plantilla para Lambda createTop10
 */
export const createTop10TemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createTop10Function = new NodejsFunction(props.scope, 'CreateTop10Function', {
    functionName: 'CreateTop10Function',
    entry: 'lib/lambda/src/functions/createTop10/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreateTop10FunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_TOP10_FUNCTION_ARN,
    stringValue: createTop10Function.functionArn,
  });

  return createTop10Function;
};

/**
 * 🏆 Plantilla para Lambda deleteTop10
 */
export const deleteTop10TemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deleteTop10Function = new NodejsFunction(props.scope, 'DeleteTop10Function', {
    functionName: 'DeleteTop10Function',
    entry: 'lib/lambda/src/functions/deleteTop10/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeleteTop10FunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_TOP10_FUNCTION_ARN,
    stringValue: deleteTop10Function.functionArn,
  });

  return deleteTop10Function;
};

/**
 * 🏪 Plantilla para Lambda createRevendedor
 */
export const createRevendedorTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createRevendedorFunction = new NodejsFunction(props.scope, 'CreateRevendedorFunction', {
    functionName: 'CreateRevendedorFunction',
    entry: 'lib/lambda/src/functions/createRevendedor/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreateRevendedorFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_REVENDEDOR_FUNCTION_ARN,
    stringValue: createRevendedorFunction.functionArn,
  });

  return createRevendedorFunction;
};

export const listRevendedoresTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listRevendedoresFunction = new NodejsFunction(props.scope, 'ListRevendedoresFunction', {
    functionName: 'ListRevendedoresFunction',
    entry: 'lib/lambda/src/functions/listRevendedores/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListRevendedoresFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_REVENDEDORES_FUNCTION_ARN,
    stringValue: listRevendedoresFunction.functionArn,
  });

  return listRevendedoresFunction;
};

export const transferirCreditosTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const transferirCreditosFunction = new NodejsFunction(props.scope, 'TransferirCreditosFunction', {
    functionName: 'TransferirCreditosFunction',
    entry: 'lib/lambda/src/functions/transferirCreditos/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'TransferirCreditosFunctionArnParameter', {
    parameterName: ArnFunctions.TRANSFERIR_CREDITOS_FUNCTION_ARN,
    stringValue: transferirCreditosFunction.functionArn,
  });

  return transferirCreditosFunction;
};


/**
 * 📱 Plantilla para Lambda clientLogin
 */
export const clientLoginTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const clientLoginFunction = new NodejsFunction(props.scope, 'ClientLoginFunction', {
    functionName: 'ClientLoginFunction',
    entry: 'lib/lambda/src/functions/clientLogin/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ClientLoginFunctionArnParameter', {
    parameterName: ArnFunctions.CLIENT_LOGIN_FUNCTION_ARN,
    stringValue: clientLoginFunction.functionArn,
  });

  return clientLoginFunction;
};

/**
 * 🏆 Plantilla para Lambda getHomeData
 */
export const getHomeDataTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getHomeDataFunction = new NodejsFunction(props.scope, 'GetHomeDataFunction', {
    functionName: 'GetHomeDataFunction',
    entry: 'lib/lambda/src/functions/getHomeData/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetHomeDataFunctionArnParameter', {
    parameterName: ArnFunctions.GET_HOME_DATA_FUNCTION_ARN,
    stringValue: getHomeDataFunction.functionArn,
  });

  return getHomeDataFunction;
};

/**
 * 🏆 Plantilla para Lambda getContentDataDetail
 */
export const getContentDataDetailTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getContentDataDetailFunction = new NodejsFunction(props.scope, 'GetContentDataDetailFunction', {
    functionName: 'GetContentDataDetailFunction',
    entry: 'lib/lambda/src/functions/getContentDataDetail/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetContentDataDetailFunctionArnParameter', {
    parameterName: ArnFunctions.GET_CONTENT_DATA_DETAIL_ARN,
    stringValue: getContentDataDetailFunction.functionArn,
  });

  return getContentDataDetailFunction;
};

/**
 * 🏆 Plantilla para Lambda getCollectionContent
 */
export const getCollectionContentTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getCollectionContentFunction = new NodejsFunction(props.scope, 'GetCollectionContentFunction', {
    functionName: 'GetCollectionContentFunction',
    entry: 'lib/lambda/src/functions/getCollectionContent/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetCollectionContentFunctionArnParameter', {
    parameterName: ArnFunctions.GET_COLLECTION_CONTENT_ARN,
    stringValue: getCollectionContentFunction.functionArn,
  });

  return getCollectionContentFunction;
};

/**
 * 🏆 Plantilla para Lambda getSearchContent
 */
export const getSearchContentTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getSearchContentFunction = new NodejsFunction(props.scope, 'GetSearchContentFunction', {
    functionName: 'GetSearchContentFunction',
    entry: 'lib/lambda/src/functions/getSearchContent/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetSearchContentFunctionArnParameter', {
    parameterName: ArnFunctions.GET_SEARCH_CONTENT_ARN,
    stringValue: getSearchContentFunction.functionArn,
  });

  return getSearchContentFunction;
};

/**
 * 🏆 Plantilla para Lambda logoutMobile
 */
export const logoutMobileTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const logoutMobileFunction = new NodejsFunction(props.scope, 'LogoutMobileFunction', {
    functionName: 'LogoutMobileFunction',
    entry: 'lib/lambda/src/functions/logoutMobile/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'LogoutMobileFunctionArnParameter', {
    parameterName: ArnFunctions.LOGOUT_MOBILE_FUNCTION_ARN,
    stringValue: logoutMobileFunction.functionArn,
  });

  return logoutMobileFunction;
};

/**
 * 🏆 Plantilla para Lambda validateServiceExpiration
 */
export const validateServiceExpirationTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const validateServiceExpirationFunction = new NodejsFunction(props.scope, 'ValidateServiceExpirationFunction', {
    functionName: 'ValidateServiceExpirationFunction',
    entry: 'lib/lambda/src/functions/validateServiceExpiration/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ValidateServiceExpirationFunctionArnParameter', {
    parameterName: ArnFunctions.VALIDATE_SERVICE_EXPIRATION_FUNCTION_ARN,
    stringValue: validateServiceExpirationFunction.functionArn,
  });

  return validateServiceExpirationFunction;
};

/**
 * 🏆 Plantilla para Lambda getEpisodesFromSeason
 */
export const getEpisodesFromSeasonTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getEpisodesFromSeasonFunction = new NodejsFunction(props.scope, 'GetEpisodesFromSeasonFunction', {
    functionName: 'GetEpisodesFromSeasonFunction',
    entry: 'lib/lambda/src/functions/getEpisodesFromSeason/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetEpisodesFromSeasonFunctionArnParameter', {
    parameterName: ArnFunctions.GET_EPISODES_FROM_SEASON_ARN,
    stringValue: getEpisodesFromSeasonFunction.functionArn,
  });

  return getEpisodesFromSeasonFunction;
};
  // static readonly CREATE_LIVE_TV_FUNCTION_ARN = "/moviehome-scrolltv/create-live-tv-function-arn";
  // static readonly LIST_LIVE_TV_FUNCTION_ARN = "/moviehome-scrolltv/list-live-tv-function-arn";
  // static readonly GET_LIVE_TV_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-live-tv-by-id-function-arn";
  // static readonly DELETE_LIVE_TV_FUNCTION_ARN = "/moviehome-scrolltv/delete-live-tv-function-arn";
  // static readonly UPDATE_LIVE_TV_FUNCTION_ARN = "/moviehome-scrolltv/update-live-tv-function-arn";
export const createLiveTvTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const createLiveTvFunction = new NodejsFunction(props.scope, 'CreateLiveTvFunction', {
    functionName: 'CreateLiveTvFunction',
    entry: 'lib/lambda/src/functions/createLiveTv/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'CreateLiveTvFunctionArnParameter', {
    parameterName: ArnFunctions.CREATE_LIVE_TV_FUNCTION_ARN,
    stringValue: createLiveTvFunction.functionArn,
  });

  return createLiveTvFunction;
}
export const listLiveTvTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const listLiveTvFunction = new NodejsFunction(props.scope, 'ListLiveTvFunction', {
    functionName: 'ListLiveTvFunction',
    entry: 'lib/lambda/src/functions/listLiveTv/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ListLiveTvFunctionArnParameter', {
    parameterName: ArnFunctions.LIST_LIVE_TV_FUNCTION_ARN,
    stringValue: listLiveTvFunction.functionArn,
  });

  return listLiveTvFunction;
}
export const getLiveTvByIdTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getLiveTvByIdFunction = new NodejsFunction(props.scope, 'GetLiveTvByIdFunction', {
    functionName: 'GetLiveTvByIdFunction',
    entry: 'lib/lambda/src/functions/getLiveTvById/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetLiveTvByIdFunctionArnParameter', {
    parameterName: ArnFunctions.GET_LIVE_TV_BY_ID_FUNCTION_ARN,
    stringValue: getLiveTvByIdFunction.functionArn,
  });

  return getLiveTvByIdFunction;
}
export const deleteLiveTvTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const deleteLiveTvFunction = new NodejsFunction(props.scope, 'DeleteLiveTvFunction', {
    functionName: 'DeleteLiveTvFunction',
    entry: 'lib/lambda/src/functions/deleteLiveTv/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'DeleteLiveTvFunctionArnParameter', {
    parameterName: ArnFunctions.DELETE_LIVE_TV_FUNCTION_ARN,
    stringValue: deleteLiveTvFunction.functionArn,
  });

  return deleteLiveTvFunction;
}
export const updateLiveTvTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const updateLiveTvFunction = new NodejsFunction(props.scope, 'UpdateLiveTvFunction', {
    functionName: 'UpdateLiveTvFunction',
    entry: 'lib/lambda/src/functions/updateLiveTv/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'UpdateLiveTvFunctionArnParameter', {
    parameterName: ArnFunctions.UPDATE_LIVE_TV_FUNCTION_ARN,
    stringValue: updateLiveTvFunction.functionArn,
  });

  return updateLiveTvFunction;
}

export const getAllLiveTvTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const getAllLiveTvFunction = new NodejsFunction(props.scope, 'GetAllLiveTvFunction', {
    functionName: 'GetAllLiveTvFunction',
    entry: 'lib/lambda/src/functions/getAllLiveTv/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'GetAllLiveTvFunctionArnParameter', {
    parameterName: ArnFunctions.GET_ALL_LIVE_TV_FUNCTION_ARN,
    stringValue: getAllLiveTvFunction.functionArn,
  });

  return getAllLiveTvFunction;
}

export const changeLiveTvStatusTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const changeLiveTvStatusFunction = new NodejsFunction(props.scope, 'ChangeLiveTvStatusFunction', {
    functionName: 'ChangeLiveTvStatusFunction',
    entry: 'lib/lambda/src/functions/changeLiveTvStatus/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'ChangeLiveTvStatusFunctionArnParameter', {
    parameterName: ArnFunctions.CHANGE_LIVE_TV_STATUS_FUNCTION_ARN,
    stringValue: changeLiveTvStatusFunction.functionArn,
  });

  return changeLiveTvStatusFunction;
}