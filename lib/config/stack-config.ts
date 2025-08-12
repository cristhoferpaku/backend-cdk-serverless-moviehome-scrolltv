import { StackProps, Environment } from 'aws-cdk-lib';

export interface StackConfiguration {
  coid: string;
  assetId: string;
  apId: string;
  sid: string;
  environment: string;
  domainName: string;
}

export const getStackConfig = (environment: string = 'dev'): StackConfiguration => {
  return {
    coid: 'moviehome',
    assetId: '0001',
    apId: 'scrolltv',
    sid: environment,
    environment,
    domainName: 'scrollprivate.work'
  };
};

export const generateStackProps = (config: StackConfiguration, suffix: string): StackProps => {
  return {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
    },
    stackName: `${config.coid}-${config.assetId}-${config.apId}-${config.sid}-${suffix}`,
    description: `Stack ${suffix} para MovieHome ScrollTV - ${config.environment}`,
  };
};

export const STACK_NAMES = {
  LAMBDA_LAYER: 'lambda-layer',
  LAMBDA_ROLES: 'lambda-roles',
  LAMBDA_FUNCTIONS: 'lambda-functions',
  API_GATEWAY: 'api-gateway',
  AUTH_API_METHODS: 'auth-api-methods',
  CONTENT_API_METHODS: 'content-api-methods',
  COMMERCE_API_METHODS: 'commerce-api-methods',
  MONITORING: 'monitoring',
  SECURITY: 'security'
} as const;