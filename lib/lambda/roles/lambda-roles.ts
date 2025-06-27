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
];