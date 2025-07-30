import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';

export const createPolicies = (region: string, account: string): { [key: string]: PolicyStatement } => ({
    // Permisos para escribir parámetros de SSM
    SSMWriteAccessPolicy: new PolicyStatement({
        actions: [
            "ssm:PutParameter",
            "ssm:DeleteParameter"
        ],
        effect: Effect.ALLOW,
        resources: [
            `arn:aws:ssm:${region}:${account}:parameter/moviehome-scrolltv/*`
        ],
    }),

    // Permisos para acceder a Secrets Manager
    SecretsManagerPolicy: new PolicyStatement({
        actions: [
            "secretsmanager:GetSecretValue",
            "secretsmanager:DescribeSecret"
        ],
        effect: Effect.ALLOW,
        resources: [
            `arn:aws:secretsmanager:${region}:${account}:secret:/serverless-app/*`
        ],
    }),

    // Permisos para S3 (lectura de objetos)
    S3ReadAccessPolicy: new PolicyStatement({
        actions: [
            "s3:GetObject",
            "s3:ListBucket",
        ],
        effect: Effect.ALLOW,
        resources: [
            "arn:aws:s3:::moviehome-scrolltv",
            "arn:aws:s3:::moviehome-scrolltv/*",
        ],
    }),
    //  "arn:aws:s3:::BUCKET_NAME",
    //"arn:aws:s3:::BUCKET_NAME/*",
});

