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
  'AdminLoginLambdaRole': 'AdminLambdaRole',
  'RefreshTokenLambdaRole': 'AdminLambdaRole',

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

  // Content Functions -> AdminLambdaRole
  'CreateMovieLambdaRole': 'AdminLambdaRole',
  'GetMovieByIdLambdaRole': 'AdminLambdaRole',
  'DeleteMovieLambdaRole': 'AdminLambdaRole',
  'ChangeMovieStatusLambdaRole': 'AdminLambdaRole',
  'UpdateMovieLambdaRole': 'AdminLambdaRole',
  
  // Series Roles
  'CreateSeriesLambdaRole': 'AdminLambdaRole',
  'GetSeriesByIdLambdaRole': 'AdminLambdaRole',
  'DeleteSeriesLambdaRole': 'AdminLambdaRole',
  'ChangeSeriesStatusLambdaRole': 'AdminLambdaRole',
  'UpdateSeriesLambdaRole': 'AdminLambdaRole',
  
  // Multimedia Roles (unified)
  'ListMultimediaLambdaRole': 'AdminLambdaRole',
  'ListSeasonsLambdaRole': 'AdminLambdaRole',
  'CreateSeasonLambdaRole': 'AdminLambdaRole',
  'GetSeasonByIdLambdaRole': 'AdminLambdaRole',
  'DeleteSeasonLambdaRole': 'AdminLambdaRole',
  'ChangeSeasonStatusLambdaRole': 'AdminLambdaRole',
  'UpdateSeasonLambdaRole': 'AdminLambdaRole',
  'ListEpisodesLambdaRole': 'AdminLambdaRole',
  'CreateEpisodeLambdaRole': 'AdminLambdaRole',
  'GetEpisodeByIdLambdaRole': 'AdminLambdaRole',
  'DeleteEpisodeLambdaRole': 'AdminLambdaRole',
  'UpdateEpisodeLambdaRole': 'AdminLambdaRole',
  'GetVideoSignatureLambdaRole': 'AdminLambdaRole',
  'ListMultimediaCategoriesLambdaRole': 'AdminLambdaRole',
  'GetMultimediaCategoryByIdLambdaRole': 'AdminLambdaRole',
  'CreateMultimediaCategoryLambdaRole': 'AdminLambdaRole',
  'UpdateMultimediaCategoryLambdaRole': 'AdminLambdaRole',
  'DeleteMultimediaCategoryLambdaRole': 'AdminLambdaRole',
  'ChangeMultimediaCategoryStatusLambdaRole': 'AdminLambdaRole',
  'GetAllMultimediaCategoriesLambdaRole': 'AdminLambdaRole',
  'ListCollectionsLambdaRole': 'AdminLambdaRole',
  'GetCollectionByIdLambdaRole': 'AdminLambdaRole',
  'CreateCollectionLambdaRole': 'AdminLambdaRole',
  'UpdateCollectionLambdaRole': 'AdminLambdaRole',
  'DeleteCollectionLambdaRole': 'AdminLambdaRole',
  'ChangeCollectionStatusLambdaRole': 'AdminLambdaRole',
  'GetAllCollectionsLambdaRole': 'AdminLambdaRole',

  // Top10 Functions -> AdminLambdaRole
  'ListTop10LambdaRole': 'AdminLambdaRole',
  'CreateTop10LambdaRole': 'AdminLambdaRole',
  'DeleteTop10LambdaRole': 'AdminLambdaRole',

  // Management Functions -> AdminLambdaRole
  'ListCastMembersLambdaRole': 'AdminLambdaRole',
  'GetCastMemberByIdLambdaRole': 'AdminLambdaRole',
  'CreateCastMemberLambdaRole': 'AdminLambdaRole',
  'UpdateCastMemberLambdaRole': 'AdminLambdaRole',
  'DeleteCastMemberLambdaRole': 'AdminLambdaRole',
  'ListAllCountriesLambdaRole': 'AdminLambdaRole',
  'GetAllSectionsLambdaRole': 'AdminLambdaRole',


  //MOBILE 
  'ClientLoginLambdaRole': 'MobileLambdaRole',
} as const;