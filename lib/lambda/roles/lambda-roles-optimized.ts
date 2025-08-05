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
    id: "AuthLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    description: "Rol compartido para todas las funciones de autenticación (login, refresh token)"
  },
  {
    id: "AdminLambdaRole", 
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    description: "Rol compartido para todas las funciones administrativas (users, platforms, roles, packages, accounts, resources)"
  },
  {
    id: "ContentLambdaRole",
    assumedByService: "lambda.amazonaws.com", 
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    description: "Rol compartido para todas las funciones de contenido multimedia (movies, series, seasons, categories, collections)"
  },
  {
    id: "ManagementLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"], 
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    description: "Rol compartido para todas las funciones de gestión (cast members, countries, sections)"
  },
  {
    id: "UtilityLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions], 
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    description: "Rol compartido para funciones utilitarias y de soporte"
  }
];

/**
 * Mapeo de funciones Lambda a roles compartidos
 * Esto define qué rol usar para cada función específica
 */
export const LambdaFunctionToRoleMapping: { [functionName: string]: string } = {
  // Auth Functions
  "AdminLoginLambdaRole": "AuthLambdaRole",
  "RefreshTokenLambdaRole": "AuthLambdaRole",

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
    "CreateMovieLambdaRole": "ContentLambdaRole",
    "GetMovieByIdLambdaRole": "ContentLambdaRole",
    "DeleteMovieLambdaRole": "ContentLambdaRole",
    "ChangeMovieStatusLambdaRole": "ContentLambdaRole",
    "UpdateMovieLambdaRole": "ContentLambdaRole",
    
    // Series Functions
    "CreateSeriesLambdaRole": "ContentLambdaRole",
    "GetSeriesByIdLambdaRole": "ContentLambdaRole",
    "DeleteSeriesLambdaRole": "ContentLambdaRole",
    "ChangeSeriesStatusLambdaRole": "ContentLambdaRole",
    "UpdateSeriesLambdaRole": "ContentLambdaRole",
    
    // Multimedia Functions (unified)
    "ListMultimediaLambdaRole": "ContentLambdaRole",

  // Content Functions - Seasons
  "ListSeasonsLambdaRole": "ContentLambdaRole",
  "CreateSeasonLambdaRole": "ContentLambdaRole",
  "GetSeasonByIdLambdaRole": "ContentLambdaRole",
  "DeleteSeasonLambdaRole": "ContentLambdaRole",
  "ChangeSeasonStatusLambdaRole": "ContentLambdaRole",
  "UpdateSeasonLambdaRole": "ContentLambdaRole",

  // Content Functions - Episodes
  "ListEpisodesLambdaRole": "ContentLambdaRole",
  "CreateEpisodeLambdaRole": "ContentLambdaRole",
  "GetEpisodeByIdLambdaRole": "ContentLambdaRole",
  "DeleteEpisodeLambdaRole": "ContentLambdaRole",
  "UpdateEpisodeLambdaRole": "ContentLambdaRole",

  // Content Functions - Video Signature
  "GetVideoSignatureLambdaRole": "ContentLambdaRole",

  // Content Functions - Categories & Collections
  "ListMultimediaCategoriesLambdaRole": "ContentLambdaRole",
  "GetMultimediaCategoryByIdLambdaRole": "ContentLambdaRole",
  "CreateMultimediaCategoryLambdaRole": "ContentLambdaRole",
  "UpdateMultimediaCategoryLambdaRole": "ContentLambdaRole",
  "DeleteMultimediaCategoryLambdaRole": "ContentLambdaRole",
  "ChangeMultimediaCategoryStatusLambdaRole": "ContentLambdaRole",
  "GetAllMultimediaCategoriesLambdaRole": "ContentLambdaRole",
  "ListCollectionsLambdaRole": "ContentLambdaRole",
  "GetCollectionByIdLambdaRole": "ContentLambdaRole",
  "CreateCollectionLambdaRole": "ContentLambdaRole",
  "UpdateCollectionLambdaRole": "ContentLambdaRole",
  "DeleteCollectionLambdaRole": "ContentLambdaRole",
  "ChangeCollectionStatusLambdaRole": "ContentLambdaRole",
  "GetAllCollectionsLambdaRole": "ContentLambdaRole",

  // Content Functions - Top10
  "ListTop10LambdaRole": "ContentLambdaRole",
  "CreateTop10LambdaRole": "ContentLambdaRole",
  "DeleteTop10LambdaRole": "ContentLambdaRole",

  // Management Functions - Cast, Countries, Sections
  "ListCastMembersLambdaRole": "ManagementLambdaRole",
  "GetCastMemberByIdLambdaRole": "ManagementLambdaRole",
  "CreateCastMemberLambdaRole": "ManagementLambdaRole",
  "UpdateCastMemberLambdaRole": "ManagementLambdaRole",
  "DeleteCastMemberLambdaRole": "ManagementLambdaRole",
  "ListAllCountriesLambdaRole": "ManagementLambdaRole",
  "GetAllSectionsLambdaRole": "ManagementLambdaRole"
};

/**
 * Función helper para obtener el rol compartido para una función específica
 */
export function getSharedRoleForFunction(functionRoleName: string): string {
  return LambdaFunctionToRoleMapping[functionRoleName] || "UtilityLambdaRole";
}