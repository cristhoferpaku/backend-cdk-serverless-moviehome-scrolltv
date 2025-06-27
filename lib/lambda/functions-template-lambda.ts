// lib/lambda/functions/functions-template-lambda.ts
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaLayerStack } from './lambda-layer-stack';
import { ArnFunctions } from './helpers/arn-functions';

export interface LambdaProps {
  scope: Construct;
  lambdaRole: iam.Role;
  layerStack: LambdaLayerStack;
}

// 🔧 Configuración base para todas las funciones Lambda
const baseLambdaConfig = {
  runtime: lambda.Runtime.NODEJS_20_X,
  memorySize: 1024,
  timeout: Duration.seconds(30),
  architecture: lambda.Architecture.X86_64,
  bundling: {
    minify: true,
    target: 'node20',
    forceDockerBundling: false,
    esbuildArgs: {
      '--packages': 'bundle'
    },
  },
  environment: {
    NODE_ENV: 'production',
    TZ: 'America/Lima',
    STAGE: 'dev',
  },
  tracing: lambda.Tracing.ACTIVE,
};

/**
 * 🏦 Plantilla para Lambda adminLogin
 */
export const adminLoginTemplateLambda = (props: LambdaProps): NodejsFunction => {
  const adminLoginFunction = new NodejsFunction(props.scope, 'AdminLoginFunction', {
    functionName: 'AdminLoginFunction',
    entry: 'lib/lambda/src/functions/adminLogin/handler.ts',
    handler: 'handler',
    role: props.lambdaRole,
    layers: [props.layerStack.utilsLayer, props.layerStack.pgLayer],
    ...baseLambdaConfig,
  });

  // Registrar ARN en SSM
  new ssm.StringParameter(props.scope, 'AdminLoginFunctionArnParameter', {
    parameterName: ArnFunctions.ADMIN_LOGIN_FUNCTION_ARN,
    stringValue: adminLoginFunction.functionArn,
  });

  return adminLoginFunction;
};
