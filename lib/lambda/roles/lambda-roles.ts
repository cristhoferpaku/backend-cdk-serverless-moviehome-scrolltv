import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { CloudWatchLogPermissions, CognitoAdminGetUserPolicy, CognitoListUsersPolicy } from "./lambda-common-permissions";




interface RoleConfig {
  id: string;
  assumedByService: string;
  managedPolicies?: string[];
  policyStatements?: PolicyStatement[];
  additionalPolicies?: string[];
}

export const LambdaRoleConfig: RoleConfig[] = [
  {
    id: "AdminLoginLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "RefreshTokenLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "ListUserAdminsLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "CreateUserAdminLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "GetUserAdminByIdLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "UpdateUserAdminLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "DeleteUserAdminLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "ChangeUserAdminStatusLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "GetPlatformsLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "GetRolesLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "CreatePackageSellerLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "CreatePackageTypeLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "ListPackageTypesLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "GetPackageTypeByIdLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "DeletePackageTypeLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "UpdatePackageTypeLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
  {
    id: "ChangePackageTypeStatusLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
      {
      id: "ListPackageSellerLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
  {
    id: "GetPackageSellerByIdLambdaRole",
    assumedByService: "lambda.amazonaws.com",
    managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
    policyStatements: [CloudWatchLogPermissions],
    additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
  },
      {
      id: "UpdatePackageSellerLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "DeletePackageSellerLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "ChangePackageSellerStatusLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "CreatePackageUserLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "GetPackageUserByIdLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "ListPackageUsersLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "UpdatePackageUserLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "DeletePackageUserLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "ChangePackageUserStatusLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "ListPackageTypesActiveLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "CreateUserAccountLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "GetUserAccountByIdLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "ListUserAccountsLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },  
    {
      id: "UpdateUserAccountLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "DeleteUserAccountLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    { 
      id: "ChangeUserAccountStatusLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    {
      id: "ListUserAccountByAdminLambdaRole",
      assumedByService: "lambda.amazonaws.com",
      managedPolicies: ["service-role/AWSLambdaBasicExecutionRole"],
      policyStatements: [CloudWatchLogPermissions],
      additionalPolicies: ["SSMReadAccessPolicy", "SecretsManagerPolicy"],
    },
    
];