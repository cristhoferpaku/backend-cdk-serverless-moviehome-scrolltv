import { RestApi, AuthorizationType } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { addApiMethodsWithLambda } from '../lambda/helpers/add-api-methods';
import { ArnFunctions } from '../lambda/helpers/arn-functions';

interface AddAllApiMethodsProps {
  restApi: RestApi;
  authorizer?: any;
  scope: Construct;
}

/**
 * Agregar todos los métodos del API siguiendo el patrón establecido
 */
export function addAllApiMethods(props: AddAllApiMethodsProps): void {
  const { restApi, authorizer, scope } = props;

  // Admin Login routes
  const adminLoginFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.ADMIN_LOGIN_FUNCTION_ARN,
    "ImportedAdminLoginFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: adminLoginFunction,
    authorizer,
    resourcePath: 'auth/login',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE,
        useAuthorizer: false,
      },
    ],
  });
} 