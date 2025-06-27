import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';

export const CloudWatchLogPermissions = new PolicyStatement({
    actions: [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
    ],
    effect: Effect.ALLOW,
    resources: ["*"],
});

export const CognitoAdminGetUserPolicy = new PolicyStatement({
  effect: Effect.ALLOW,
  actions: ["cognito-idp:AdminGetUser"],
  resources: [
    "*", // ← reemplaza con tu user pool ARN real
  ],
});

export const CognitoListUsersPolicy = new PolicyStatement({
  effect: Effect.ALLOW,
  actions: ["cognito-idp:ListUsers"],
  resources: [
    "*",
  ],
});