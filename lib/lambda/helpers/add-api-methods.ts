import { AuthorizationType, CognitoUserPoolsAuthorizer, LambdaIntegration, RestApi, IResource, MethodOptions } from 'aws-cdk-lib/aws-apigateway';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { IFunction } from 'aws-cdk-lib/aws-lambda';

interface AddApiMethodsProps {
    restApi: RestApi;
    lambdaFunction: IFunction;
    authorizer?: CognitoUserPoolsAuthorizer;
    resourcePath: string;
    methods: { 
        method: string; 
        authorizationType: AuthorizationType; 
        useAuthorizer: boolean 
        queryParameters?: string[];
    }[];
}

/**
 * Helper para crear un recurso y asociar múltiples métodos de API Gateway con una Lambda.
 * 
 * @param {AddApiMethodsProps} props - Propiedades necesarias para crear el recurso y los métodos.
 */
export function addApiMethodsWithLambda(props: AddApiMethodsProps) {
    const { restApi, lambdaFunction, authorizer, resourcePath, methods } = props;

    // Dividir el resourcePath en partes para crear recursos jerárquicamente
    const pathParts = resourcePath.split('/').filter(part => part !== '');
    let currentResource: IResource = restApi.root;

    // Crear los recursos jerárquicos
    pathParts.forEach((part) => {
        currentResource = currentResource.getResource(part) || currentResource.addResource(part);
    });

    // Integración con la Lambda
    const lambdaIntegration = new LambdaIntegration(lambdaFunction);

    // Otorgar permisos para que API Gateway invoque la Lambda
    lambdaFunction.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com'));

    // Definir métodos según la configuración proporcionada
    methods.forEach(({ method, authorizationType, useAuthorizer, queryParameters }) => {
        const methodOptions: MethodOptions = {
            authorizationType,
            authorizer: useAuthorizer ? authorizer : undefined,
            requestParameters: {},
        };

        // Agregar parámetros de consulta si están definidos
        if (queryParameters) {
            queryParameters.forEach((param) => {
                methodOptions.requestParameters![`method.request.querystring.${param}`] = false; // Parámetro opcional
            });
        }

        // Agregar el método al recurso
        currentResource.addMethod(method, lambdaIntegration, methodOptions);

        // COMENTADO: Permisos individuales eliminados para usar roles compartidos
        // Los roles compartidos ya incluyen los permisos necesarios para API Gateway
        // Esto reduce significativamente el número de recursos de CloudFormation
        // lambdaFunction.addPermission(`${resourcePath.replace(/\//g, '-')}-${method}-InvokePermission`, {
        //     principal: new ServicePrincipal('apigateway.amazonaws.com'),
        //     sourceArn: `${restApi.arnForExecuteApi()}/*/${method}/${resourcePath}`,
        // });
    });
}