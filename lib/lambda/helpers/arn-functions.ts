import { Function, IFunction } from "aws-cdk-lib/aws-lambda";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";

/**
 * Helper para recuperar valores de StringParameter desde el AWS Systems Manager Parameter Store.
 * Proporciona funciones para listar valores de parámetros clave de tipo string.
 */
export class ArnFunctions {
  // Constantes de los nombres de parámetros para MovieHome ScrollTV
  static readonly ADMIN_LOGIN_FUNCTION_ARN = "/moviehome-scrolltv/admin-login-function-arn";
  static readonly REFRESH_TOKEN_FUNCTION_ARN = "/moviehome-scrolltv/refresh-token-function-arn";
  static readonly LIST_USER_ADMINS_FUNCTION_ARN = "/moviehome-scrolltv/list-user-admins-function-arn";
  static readonly CREATE_USER_ADMIN_FUNCTION_ARN = "/moviehome-scrolltv/create-user-admin-function-arn";
  static readonly GET_USER_ADMIN_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-user-admin-by-id-function-arn";
  static readonly UPDATE_USER_ADMIN_FUNCTION_ARN = "/moviehome-scrolltv/update-user-admin-function-arn";
  static readonly DELETE_USER_ADMIN_FUNCTION_ARN = "/moviehome-scrolltv/delete-user-admin-function-arn";
  static readonly CHANGE_USER_ADMIN_STATUS_FUNCTION_ARN = "/moviehome-scrolltv/change-user-admin-status-function-arn";
  static readonly GET_PLATFORMS_FUNCTION_ARN = "/moviehome-scrolltv/get-platforms-function-arn";
  static readonly GET_ROLES_FUNCTION_ARN = "/moviehome-scrolltv/get-roles-function-arn";
  static readonly CREATE_PACKAGE_SELLER_FUNCTION_ARN = "/moviehome-scrolltv/create-package-seller-function-arn";
  static readonly CREATE_PACKAGE_TYPE_FUNCTION_ARN = "/moviehome-scrolltv/create-package-type-function-arn";
  static readonly LIST_PACKAGE_TYPES_FUNCTION_ARN = "/moviehome-scrolltv/list-package-types-function-arn";
  static readonly GET_PACKAGE_TYPE_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-package-type-by-id-function-arn";
  static readonly DELETE_PACKAGE_TYPE_FUNCTION_ARN = "/moviehome-scrolltv/delete-package-type-function-arn";
  static readonly UPDATE_PACKAGE_TYPE_FUNCTION_ARN = "/moviehome-scrolltv/update-package-type-function-arn";
  static readonly LIST_PACKAGE_SELLER_FUNCTION_ARN = "/moviehome-scrolltv/list-package-seller-function-arn";
  static readonly GET_PACKAGE_SELLER_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-package-seller-by-id-function-arn";
  static readonly UPDATE_PACKAGE_SELLER_FUNCTION_ARN = "/moviehome-scrolltv/update-package-seller-function-arn";
  static readonly DELETE_PACKAGE_SELLER_FUNCTION_ARN = "/moviehome-scrolltv/delete-package-seller-function-arn";
  static readonly CHANGE_PACKAGE_SELLER_STATUS_FUNCTION_ARN = "/moviehome-scrolltv/change-package-seller-status-function-arn";
  static readonly CREATE_PACKAGE_USER_FUNCTION_ARN = "/moviehome-scrolltv/create-package-user-function-arn";
  static readonly GET_PACKAGE_USER_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-package-user-by-id-function-arn";
  static readonly LIST_PACKAGE_USERS_FUNCTION_ARN = "/moviehome-scrolltv/list-package-users-function-arn";
  static readonly UPDATE_PACKAGE_USER_FUNCTION_ARN = "/moviehome-scrolltv/update-package-user-function-arn";
  static readonly DELETE_PACKAGE_USER_FUNCTION_ARN = "/moviehome-scrolltv/delete-package-user-function-arn";
  static readonly CHANGE_PACKAGE_USER_STATUS_FUNCTION_ARN = "/moviehome-scrolltv/change-package-user-status-function-arn";
  static readonly CHANGE_PACKAGE_TYPE_STATUS_FUNCTION_ARN = "/moviehome-scrolltv/change-package-type-status-function-arn";
  static readonly LIST_PACKAGE_TYPES_ACTIVE_FUNCTION_ARN = "/moviehome-scrolltv/list-package-types-active-function-arn";

  static readonly CREATE_USER_ACCOUNT_FUNCTION_ARN = "/moviehome-scrolltv/create-user-account-function-arn";
  static readonly GET_USER_ACCOUNT_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-user-account-by-id-function-arn";
  static readonly LIST_USER_ACCOUNTS_FUNCTION_ARN = "/moviehome-scrolltv/list-user-accounts-function-arn";
  static readonly UPDATE_USER_ACCOUNT_FUNCTION_ARN = "/moviehome-scrolltv/update-user-account-function-arn";
  static readonly DELETE_USER_ACCOUNT_FUNCTION_ARN = "/moviehome-scrolltv/delete-user-account-function-arn";
  static readonly CHANGE_USER_ACCOUNT_STATUS_FUNCTION_ARN = "/moviehome-scrolltv/change-user-account-status-function-arn";
  static readonly LIST_USER_ACCOUNT_BY_ADMIN_FUNCTION_ARN = "/moviehome-scrolltv/list-user-account-by-admin-function-arn";
  static readonly ASSIGN_SELLER_CREDIT_FUNCTION_ARN = "/moviehome-scrolltv/assign-seller-credit-function-arn";
  static readonly CREATE_RESOURCE_FUNCTION_ARN = "/moviehome-scrolltv/create-resource-function-arn";
  static readonly LIST_RESOURCE_FUNCTION_ARN = "/moviehome-scrolltv/list-resource-function-arn";
  static readonly GET_RESOURCE_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-resource-by-id-function-arn";
  static readonly CHANGE_RESOURCE_STATE_FUNCTION_ARN = "/moviehome-scrolltv/change-resource-state-function-arn";
  static readonly DELETE_RESOURCE_FUNCTION_ARN = "/moviehome-scrolltv/delete-resource-function-arn";
  static readonly UPDATE_RESOURCE_FUNCTION_ARN = "/moviehome-scrolltv/update-resource-function-arn";
  static readonly GET_SELLER_CREDIT_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-seller-credit-by-id-function-arn";
  static readonly LIST_CAST_MEMBERS_FUNCTION_ARN = "/moviehome-scrolltv/list-cast-members-function-arn";
  static readonly GET_CAST_MEMBER_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-cast-member-by-id-function-arn";
  static readonly CREATE_CAST_MEMBER_FUNCTION_ARN = "/moviehome-scrolltv/create-cast-member-function-arn";
  static readonly UPDATE_CAST_MEMBER_FUNCTION_ARN = "/moviehome-scrolltv/update-cast-member-function-arn";
  static readonly DELETE_CAST_MEMBER_FUNCTION_ARN = "/moviehome-scrolltv/delete-cast-member-function-arn";
  static readonly LIST_ALL_COUNTRIES_FUNCTION_ARN = "/moviehome-scrolltv/list-all-countries-function-arn";

  /**
   * Recuperar un valor de tipo string desde el Parameter Store.
   * @param scope - El constructo desde el cual se realiza la llamada.
   * @param parameterName - El nombre del parámetro a recuperar.
   * @returns El valor del parámetro como una cadena.
   */
  static getStringParameterValue(
    scope: Construct,
    parameterName: string
  ): string {
    return ssm.StringParameter.valueForStringParameter(scope, parameterName);
  }

  /**
   * Recuperar múltiples valores de parámetros desde el Parameter Store.
   * @param scope - El constructo desde el cual se realiza la llamada.
   * @param parameterNames - Array de nombres de parámetros a recuperar.
   * @returns Objeto con los valores de los parámetros.
   */
  static getMultipleStringParameterValues(
    scope: Construct,
    parameterNames: string[]
  ): { [key: string]: string } {
    const parameters: { [key: string]: string } = {};
    parameterNames.forEach((name) => {
      parameters[name] = ssm.StringParameter.valueForStringParameter(
        scope,
        name
      );
    });
    return parameters;
  }

  /**
   * Obtiene una función Lambda existente usando su ARN almacenado en SSM
   * @param scope - El constructo desde el cual se realiza la llamada.
   * @param parameterName - El nombre del parámetro SSM que contiene el ARN.
   * @param functionId - ID único para la función importada.
   * @returns La función Lambda importada.
   */
  static getLambdaFunctionFromArn(
    scope: Construct,
    parameterName: string,
    functionId: string = "ImportedLambdaFunction"
  ): IFunction {
    const functionArn = ArnFunctions.getStringParameterValue(
      scope,
      parameterName
    );
    return Function.fromFunctionAttributes(scope, functionId, {
      functionArn,
      sameEnvironment: true,
      skipPermissions: true, // Evita intentar otorgar permisos que puedan estar definidos en otro lugar
    });
  }


  
}