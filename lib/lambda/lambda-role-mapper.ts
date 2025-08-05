import { Role } from "aws-cdk-lib/aws-iam";
import { getSharedRoleForFunction } from "./roles/lambda-roles-optimized";

/**
 * Helper para obtener el rol compartido correcto para una función Lambda
 * Esto permite usar roles compartidos en lugar de roles individuales
 */
export function getSharedRole(
  functionRoleName: string, 
  lambdaRoles: { [key: string]: Role }
): Role {
  const sharedRoleName = getSharedRoleForFunction(functionRoleName);
  const role = lambdaRoles[sharedRoleName];
  
  if (!role) {
    throw new Error(`Shared role '${sharedRoleName}' not found for function '${functionRoleName}'`);
  }
  
  return role;
}

/**
 * Mapeo de funciones Lambda a roles compartidos
 * Esto centraliza la lógica de asignación de roles
 */
export const LAMBDA_ROLE_MAPPING = {
  // Auth Functions -> AuthLambdaRole
  'AdminLoginLambdaRole': 'AuthLambdaRole',
  'RefreshTokenLambdaRole': 'AuthLambdaRole',

  // Admin Functions -> AdminLambdaRole
  'ListUserAdminsLambdaRole': 'AdminLambdaRole',
  'CreateUserAdminLambdaRole': 'AdminLambdaRole',
  'GetUserAdminByIdLambdaRole': 'AdminLambdaRole',
  'UpdateUserAdminLambdaRole': 'AdminLambdaRole',
  'DeleteUserAdminLambdaRole': 'AdminLambdaRole',
  'ChangeUserAdminStatusLambdaRole': 'AdminLambdaRole',
  'GetPlatformsLambdaRole': 'AdminLambdaRole',
  'GetRolesLambdaRole': 'AdminLambdaRole',
  'CreatePackageSellerLambdaRole': 'AdminLambdaRole',
  'CreatePackageTypeLambdaRole': 'AdminLambdaRole',
  'ListPackageTypesLambdaRole': 'AdminLambdaRole',
  'GetPackageTypeByIdLambdaRole': 'AdminLambdaRole',
  'DeletePackageTypeLambdaRole': 'AdminLambdaRole',
  'UpdatePackageTypeLambdaRole': 'AdminLambdaRole',
  'ChangePackageTypeStatusLambdaRole': 'AdminLambdaRole',
  'ListPackageSellerLambdaRole': 'AdminLambdaRole',
  'GetPackageSellerByIdLambdaRole': 'AdminLambdaRole',
  'UpdatePackageSellerLambdaRole': 'AdminLambdaRole',
  'DeletePackageSellerLambdaRole': 'AdminLambdaRole',
  'ChangePackageSellerStatusLambdaRole': 'AdminLambdaRole',
  'CreatePackageUserLambdaRole': 'AdminLambdaRole',
  'GetPackageUserByIdLambdaRole': 'AdminLambdaRole',
  'ListPackageUsersLambdaRole': 'AdminLambdaRole',
  'UpdatePackageUserLambdaRole': 'AdminLambdaRole',
  'DeletePackageUserLambdaRole': 'AdminLambdaRole',
  'ChangePackageUserStatusLambdaRole': 'AdminLambdaRole',
  'ListPackageTypesActiveLambdaRole': 'AdminLambdaRole',
  'CreateUserAccountLambdaRole': 'AdminLambdaRole',
  'GetUserAccountByIdLambdaRole': 'AdminLambdaRole',
  'ListUserAccountsLambdaRole': 'AdminLambdaRole',
  'UpdateUserAccountLambdaRole': 'AdminLambdaRole',
  'DeleteUserAccountLambdaRole': 'AdminLambdaRole',
  'ChangeUserAccountStatusLambdaRole': 'AdminLambdaRole',
  'ListUserAccountByAdminLambdaRole': 'AdminLambdaRole',
  'AssignSellerCreditLambdaRole': 'AdminLambdaRole',
  'CreateResourceLambdaRole': 'AdminLambdaRole',
  'ListResourceLambdaRole': 'AdminLambdaRole',
  'GetResourceByIdLambdaRole': 'AdminLambdaRole',
  'ChangeResourceStateLambdaRole': 'AdminLambdaRole',
  'DeleteResourceLambdaRole': 'AdminLambdaRole',
  'UpdateResourceLambdaRole': 'AdminLambdaRole',
  'GetSellerCreditByIdLambdaRole': 'AdminLambdaRole',
  'CreateRevendedorLambdaRole': 'AdminLambdaRole',
  'ListRevendedorLambdaRole': 'AdminLambdaRole',
  'TransferirCreditosLambdaRole': 'AdminLambdaRole',

  // Content Functions -> ContentLambdaRole
  'CreateMovieLambdaRole': 'ContentLambdaRole',
  'GetMovieByIdLambdaRole': 'ContentLambdaRole',
  'DeleteMovieLambdaRole': 'ContentLambdaRole',
  'ChangeMovieStatusLambdaRole': 'ContentLambdaRole',
  'UpdateMovieLambdaRole': 'ContentLambdaRole',
  
  // Series Roles
  'CreateSeriesLambdaRole': 'ContentLambdaRole',
  'GetSeriesByIdLambdaRole': 'ContentLambdaRole',
  'DeleteSeriesLambdaRole': 'ContentLambdaRole',
  'ChangeSeriesStatusLambdaRole': 'ContentLambdaRole',
  'UpdateSeriesLambdaRole': 'ContentLambdaRole',
  
  // Multimedia Roles (unified)
  'ListMultimediaLambdaRole': 'ContentLambdaRole',
  'ListSeasonsLambdaRole': 'ContentLambdaRole',
  'CreateSeasonLambdaRole': 'ContentLambdaRole',
  'GetSeasonByIdLambdaRole': 'ContentLambdaRole',
  'DeleteSeasonLambdaRole': 'ContentLambdaRole',
  'ChangeSeasonStatusLambdaRole': 'ContentLambdaRole',
  'UpdateSeasonLambdaRole': 'ContentLambdaRole',
  'ListEpisodesLambdaRole': 'ContentLambdaRole',
  'CreateEpisodeLambdaRole': 'ContentLambdaRole',
  'GetEpisodeByIdLambdaRole': 'ContentLambdaRole',
  'DeleteEpisodeLambdaRole': 'ContentLambdaRole',
  'UpdateEpisodeLambdaRole': 'ContentLambdaRole',
  'GetVideoSignatureLambdaRole': 'ContentLambdaRole',
  'ListMultimediaCategoriesLambdaRole': 'ContentLambdaRole',
  'GetMultimediaCategoryByIdLambdaRole': 'ContentLambdaRole',
  'CreateMultimediaCategoryLambdaRole': 'ContentLambdaRole',
  'UpdateMultimediaCategoryLambdaRole': 'ContentLambdaRole',
  'DeleteMultimediaCategoryLambdaRole': 'ContentLambdaRole',
  'ChangeMultimediaCategoryStatusLambdaRole': 'ContentLambdaRole',
  'GetAllMultimediaCategoriesLambdaRole': 'ContentLambdaRole',
  'ListCollectionsLambdaRole': 'ContentLambdaRole',
  'GetCollectionByIdLambdaRole': 'ContentLambdaRole',
  'CreateCollectionLambdaRole': 'ContentLambdaRole',
  'UpdateCollectionLambdaRole': 'ContentLambdaRole',
  'DeleteCollectionLambdaRole': 'ContentLambdaRole',
  'ChangeCollectionStatusLambdaRole': 'ContentLambdaRole',
  'GetAllCollectionsLambdaRole': 'ContentLambdaRole',

  // Top10 Functions -> ContentLambdaRole
  'ListTop10LambdaRole': 'ContentLambdaRole',
  'CreateTop10LambdaRole': 'ContentLambdaRole',
  'DeleteTop10LambdaRole': 'ContentLambdaRole',

  // Management Functions -> ManagementLambdaRole
  'ListCastMembersLambdaRole': 'ManagementLambdaRole',
  'GetCastMemberByIdLambdaRole': 'ManagementLambdaRole',
  'CreateCastMemberLambdaRole': 'ManagementLambdaRole',
  'UpdateCastMemberLambdaRole': 'ManagementLambdaRole',
  'DeleteCastMemberLambdaRole': 'ManagementLambdaRole',
  'ListAllCountriesLambdaRole': 'ManagementLambdaRole',
  'GetAllSectionsLambdaRole': 'ManagementLambdaRole'
} as const;