import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { CloudWatchLogPermissions } from "./lambda-common-permissions";

interface RoleConfig {
  id: string;
  assumedByService: string;
  managedPolicies?: string[];
  policyStatements?: PolicyStatement[];
  additionalPolicies?: string[];
  description: string;
}

/**
 * Configuración optimizada de roles compartidos por categoría funcional
 * Esto reduce de 80+ roles individuales a solo 5 roles compartidos
 * Reduciendo significativamente el número de recursos en CloudFormation
 */
export const OptimizedLambdaRoleConfig: RoleConfig[] = [

  {
    id: "AdminLambdaRole", 
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    description: "Rol compartido para todas las funciones administrativas"
  },
   {
    id: "MobileLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    description: "Rol compartido para todas las funciones móviles"
  }
];

/**
 * Mapeo de funciones Lambda a roles compartidos
 * Esto define qué rol usar para cada función específica
 */
export const LambdaFunctionToRoleMapping: { [functionName: string]: string } = {
  // Auth Functions
  "AdminLoginLambdaRole": "AdminLambdaRole",
  "RefreshTokenLambdaRole": "AdminLambdaRole",

  // Admin Functions - User Management
  "ListUserAdminsLambdaRole": "AdminLambdaRole",
  "CreateUserAdminLambdaRole": "AdminLambdaRole", 
  "GetUserAdminByIdLambdaRole": "AdminLambdaRole",
  "UpdateUserAdminLambdaRole": "AdminLambdaRole",
  "DeleteUserAdminLambdaRole": "AdminLambdaRole",
  "ChangeUserAdminStatusLambdaRole": "AdminLambdaRole",

  // Admin Functions - Platform & Roles
  "GetPlatformsLambdaRole": "AdminLambdaRole",
  "GetRolesLambdaRole": "AdminLambdaRole",

  // Admin Functions - Package Management
  "CreatePackageSellerLambdaRole": "AdminLambdaRole",
  "CreatePackageTypeLambdaRole": "AdminLambdaRole",
  "ListPackageTypesLambdaRole": "AdminLambdaRole",
  "GetPackageTypeByIdLambdaRole": "AdminLambdaRole",
  "DeletePackageTypeLambdaRole": "AdminLambdaRole",
  "UpdatePackageTypeLambdaRole": "AdminLambdaRole",
  "ChangePackageTypeStatusLambdaRole": "AdminLambdaRole",
  "ListPackageSellerLambdaRole": "AdminLambdaRole",
  "GetPackageSellerByIdLambdaRole": "AdminLambdaRole",
  "UpdatePackageSellerLambdaRole": "AdminLambdaRole",
  "DeletePackageSellerLambdaRole": "AdminLambdaRole",
  "ChangePackageSellerStatusLambdaRole": "AdminLambdaRole",
  "CreatePackageUserLambdaRole": "AdminLambdaRole",
  "GetPackageUserByIdLambdaRole": "AdminLambdaRole",
  "ListPackageUsersLambdaRole": "AdminLambdaRole",
  "UpdatePackageUserLambdaRole": "AdminLambdaRole",
  "DeletePackageUserLambdaRole": "AdminLambdaRole",
  "ChangePackageUserStatusLambdaRole": "AdminLambdaRole",
  "ListPackageTypesActiveLambdaRole": "AdminLambdaRole",

  // Admin Functions - User Account Management
  "CreateUserAccountLambdaRole": "AdminLambdaRole",
  "GetUserAccountByIdLambdaRole": "AdminLambdaRole",
  "ListUserAccountsLambdaRole": "AdminLambdaRole",
  "UpdateUserAccountLambdaRole": "AdminLambdaRole",
  "DeleteUserAccountLambdaRole": "AdminLambdaRole",
  "ChangeUserAccountStatusLambdaRole": "AdminLambdaRole",
  "ListUserAccountByAdminLambdaRole": "AdminLambdaRole",

  // Admin Functions - Credit & Resource Management
  "AssignSellerCreditLambdaRole": "AdminLambdaRole",
  "CreateResourceLambdaRole": "AdminLambdaRole",
  "ListResourceLambdaRole": "AdminLambdaRole",
  "GetResourceByIdLambdaRole": "AdminLambdaRole",
  "ChangeResourceStateLambdaRole": "AdminLambdaRole",
  "DeleteResourceLambdaRole": "AdminLambdaRole",
  "UpdateResourceLambdaRole": "AdminLambdaRole",
  "GetSellerCreditByIdLambdaRole": "AdminLambdaRole",
  "CreateRevendedorLambdaRole": "AdminLambdaRole",
  "ListRevendedorLambdaRole": "AdminLambdaRole",
  "TransferirCreditosLambdaRole": "AdminLambdaRole",

  // Content Functions - Movies
  "CreateMovieLambdaRole": "AdminLambdaRole",
  "GetMovieByIdLambdaRole": "AdminLambdaRole",
  "DeleteMovieLambdaRole": "AdminLambdaRole",
  "ChangeMovieStatusLambdaRole": "AdminLambdaRole",
  "UpdateMovieLambdaRole": "AdminLambdaRole",
    
  // Series Functions
  "CreateSeriesLambdaRole": "AdminLambdaRole",
  "GetSeriesByIdLambdaRole": "AdminLambdaRole",
  "DeleteSeriesLambdaRole": "AdminLambdaRole",
  "ChangeSeriesStatusLambdaRole": "AdminLambdaRole",
  "UpdateSeriesLambdaRole": "AdminLambdaRole",
    
  // Multimedia Functions (unified)
  "ListMultimediaLambdaRole": "AdminLambdaRole",

  // Content Functions - Seasons
  "ListSeasonsLambdaRole": "AdminLambdaRole",
  "CreateSeasonLambdaRole": "AdminLambdaRole",
  "GetSeasonByIdLambdaRole": "AdminLambdaRole",
  "DeleteSeasonLambdaRole": "AdminLambdaRole",
  "ChangeSeasonStatusLambdaRole": "AdminLambdaRole",
  "UpdateSeasonLambdaRole": "AdminLambdaRole",

  // Content Functions - Episodes
  "ListEpisodesLambdaRole": "AdminLambdaRole",
  "CreateEpisodeLambdaRole": "AdminLambdaRole",
  "GetEpisodeByIdLambdaRole": "AdminLambdaRole",
  "DeleteEpisodeLambdaRole": "AdminLambdaRole",
  "UpdateEpisodeLambdaRole": "AdminLambdaRole",

  // Content Functions - Video Signature
  "GetVideoSignatureLambdaRole": "AdminLambdaRole",

  // Content Functions - Categories & Collections
  "ListMultimediaCategoriesLambdaRole": "AdminLambdaRole",
  "GetMultimediaCategoryByIdLambdaRole": "AdminLambdaRole",
  "CreateMultimediaCategoryLambdaRole": "AdminLambdaRole",
  "UpdateMultimediaCategoryLambdaRole": "AdminLambdaRole",
  "DeleteMultimediaCategoryLambdaRole": "AdminLambdaRole",
  "ChangeMultimediaCategoryStatusLambdaRole": "AdminLambdaRole",
  "GetAllMultimediaCategoriesLambdaRole": "AdminLambdaRole",
  "ListCollectionsLambdaRole": "AdminLambdaRole",
  "GetCollectionByIdLambdaRole": "AdminLambdaRole",
  "CreateCollectionLambdaRole": "AdminLambdaRole",
  "UpdateCollectionLambdaRole": "AdminLambdaRole",
  "DeleteCollectionLambdaRole": "AdminLambdaRole",
  "ChangeCollectionStatusLambdaRole": "AdminLambdaRole",
  "GetAllCollectionsLambdaRole": "AdminLambdaRole",

  // Content Functions - Top10
  "ListTop10LambdaRole": "AdminLambdaRole",
  "CreateTop10LambdaRole": "AdminLambdaRole",
  "DeleteTop10LambdaRole": "AdminLambdaRole",

  // Management Functions - Cast, Countries, Sections
  "ListCastMembersLambdaRole": "AdminLambdaRole",
  "GetCastMemberByIdLambdaRole": "AdminLambdaRole",
  "CreateCastMemberLambdaRole": "AdminLambdaRole",
  "UpdateCastMemberLambdaRole": "AdminLambdaRole",
  "DeleteCastMemberLambdaRole": "AdminLambdaRole",
  "ListAllCountriesLambdaRole": "AdminLambdaRole",
  "GetAllSectionsLambdaRole": "AdminLambdaRole"
};

/**
 * Función helper para obtener el rol compartido para una función específica
 */
export function getSharedRoleForFunction(functionRoleName: string): string {
  return LambdaFunctionToRoleMapping[functionRoleName] || "AdminLambdaRole";
}