import { CfnOutput, Stack, StackProps, Tags } from "aws-cdk-lib";
import { Role } from "aws-cdk-lib/aws-iam";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from 'constructs';
import {
  adminLoginTemplateLambda,
} from './functions-template-lambda';
import { LambdaLayerStack } from './lambda-layer-stack';

interface LambdaFunctionStackProps extends StackProps {
  lambdaRoles: { [key: string]: Role };
  layerStack: LambdaLayerStack;
}
export class LambdaFunctionStack extends Stack {
  public readonly adminLoginFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: LambdaFunctionStackProps) {
    super(scope, id, props);

    // Función adminLogin
    this.adminLoginFunction = adminLoginTemplateLambda({
      lambdaRole: props.lambdaRoles['AdminLoginLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });


  // Outputs
    new CfnOutput(this, 'AdminLoginFunctionArn', {
      value: this.adminLoginFunction.functionArn,
      description: 'ARN de la función AdminLogin',
      exportName: `${Stack.of(this).stackName}-AdminLoginFunctionArn`,
    });

    // Tags  
    //Tags.of(this).add('Component', 'LambdaFunctions');
  }
} 