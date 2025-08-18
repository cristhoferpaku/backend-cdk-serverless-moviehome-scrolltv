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
  static readonly CLIENT_LOGIN_FUNCTION_ARN = "/moviehome-scrolltv/client-login-function-arn";
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
  static readonly GET_ALL_SECTIONS_FUNCTION_ARN = "/moviehome-scrolltv/get-all-sections-function-arn";

  // Collections Functions ARNs
  static readonly LIST_COLLECTIONS_FUNCTION_ARN = "/moviehome-scrolltv/list-collections-function-arn";
  static readonly GET_COLLECTION_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-collection-by-id-function-arn";
  static readonly CREATE_COLLECTION_FUNCTION_ARN = "/moviehome-scrolltv/create-collection-function-arn";
  static readonly UPDATE_COLLECTION_FUNCTION_ARN = "/moviehome-scrolltv/update-collection-function-arn";
  static readonly DELETE_COLLECTION_FUNCTION_ARN = "/moviehome-scrolltv/delete-collection-function-arn";
  static readonly CHANGE_COLLECTION_STATUS_FUNCTION_ARN = "/moviehome-scrolltv/change-collection-status-function-arn";
  static readonly GET_ALL_COLLECTIONS_FUNCTION_ARN = "/moviehome-scrolltv/get-all-collections-function-arn";
  
  // Multimedia Categories Functions ARNs
  static readonly LIST_MULTIMEDIA_CATEGORIES_FUNCTION_ARN = "/moviehome-scrolltv/list-multimedia-categories-function-arn";
  static readonly GET_MULTIMEDIA_CATEGORY_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-multimedia-category-by-id-function-arn";
  static readonly CREATE_MULTIMEDIA_CATEGORY_FUNCTION_ARN = "/moviehome-scrolltv/create-multimedia-category-function-arn";
  static readonly UPDATE_MULTIMEDIA_CATEGORY_FUNCTION_ARN = "/moviehome-scrolltv/update-multimedia-category-function-arn";
  static readonly DELETE_MULTIMEDIA_CATEGORY_FUNCTION_ARN = "/moviehome-scrolltv/delete-multimedia-category-function-arn";
  static readonly CHANGE_MULTIMEDIA_CATEGORY_STATUS_FUNCTION_ARN = "/moviehome-scrolltv/change-multimedia-category-status-function-arn";
  static readonly GET_ALL_MULTIMEDIA_CATEGORIES_FUNCTION_ARN = "/moviehome-scrolltv/get-all-multimedia-categories-function-arn";

  // Movies Functions ARNs
  static readonly CREATE_MOVIE_FUNCTION_ARN = "/moviehome-scrolltv/create-movie-function-arn";
  static readonly GET_MOVIE_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-movie-by-id-function-arn";
  static readonly DELETE_MOVIE_FUNCTION_ARN = "/moviehome-scrolltv/delete-movie-function-arn";
  static readonly CHANGE_MOVIE_STATUS_FUNCTION_ARN = "/moviehome-scrolltv/change-movie-status-function-arn";
  static readonly UPDATE_MOVIE_FUNCTION_ARN = "/moviehome-scrolltv/update-movie-function-arn";

  // Series Functions ARNs
  static readonly CREATE_SERIES_FUNCTION_ARN = "/moviehome-scrolltv/create-series-function-arn";
  static readonly GET_SERIES_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-series-by-id-function-arn";
  static readonly DELETE_SERIES_FUNCTION_ARN = "/moviehome-scrolltv/delete-series-function-arn";
  static readonly CHANGE_SERIES_STATUS_FUNCTION_ARN = "/moviehome-scrolltv/change-series-status-function-arn";
  static readonly UPDATE_SERIES_FUNCTION_ARN = "/moviehome-scrolltv/update-series-function-arn";

  // Multimedia Functions ARNs (unified for movies and series)
  static readonly LIST_MULTIMEDIA_FUNCTION_ARN = "/moviehome-scrolltv/list-multimedia-function-arn";

  // Seasons Functions ARNs
  static readonly CREATE_SEASON_FUNCTION_ARN = "/moviehome-scrolltv/create-season-function-arn";
  static readonly GET_SEASON_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-season-by-id-function-arn";
  static readonly LIST_SEASONS_FUNCTION_ARN = "/moviehome-scrolltv/list-seasons-function-arn";
  static readonly DELETE_SEASON_FUNCTION_ARN = "/moviehome-scrolltv/delete-season-function-arn";
  static readonly UPDATE_SEASON_FUNCTION_ARN = "/moviehome-scrolltv/update-season-function-arn";

  // Episodes Functions ARNs
  static readonly CREATE_EPISODE_FUNCTION_ARN = "/moviehome-scrolltv/create-episode-function-arn";
  static readonly GET_EPISODE_BY_ID_FUNCTION_ARN = "/moviehome-scrolltv/get-episode-by-id-function-arn";
  static readonly LIST_EPISODES_FUNCTION_ARN = "/moviehome-scrolltv/list-episodes-function-arn";
  static readonly DELETE_EPISODE_FUNCTION_ARN = "/moviehome-scrolltv/delete-episode-function-arn";
  static readonly UPDATE_EPISODE_FUNCTION_ARN = "/moviehome-scrolltv/update-episode-function-arn";

  // Video Signature Function ARN
  static readonly GET_VIDEO_SIGNATURE_FUNCTION_ARN = "/moviehome-scrolltv/get-video-signature-function-arn";

  // Top10 Functions ARNs
  static readonly LIST_TOP10_FUNCTION_ARN = "/moviehome-scrolltv/list-top10-function-arn";
  static readonly CREATE_TOP10_FUNCTION_ARN = "/moviehome-scrolltv/create-top10-function-arn";
  static readonly DELETE_TOP10_FUNCTION_ARN = "/moviehome-scrolltv/delete-top10-function-arn";

  // Revendedor Functions
  static readonly CREATE_REVENDEDOR_FUNCTION_ARN = "/moviehome-scrolltv/create-revendedor-function-arn";
  static readonly LIST_REVENDEDORES_FUNCTION_ARN = "/moviehome-scrolltv/list-revendedores-function-arn";
  static readonly TRANSFERIR_CREDITOS_FUNCTION_ARN = "/moviehome-scrolltv/transferir-creditos-function-arn";

  //APP FUNCTIONS
  static readonly GET_HOME_DATA_FUNCTION_ARN = "/moviehome-scrolltv/get-home-data-function-arn";

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