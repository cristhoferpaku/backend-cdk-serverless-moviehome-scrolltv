import { Function, IFunction } from "aws-cdk-lib/aws-lambda";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";

/**
 * Helper para recuperar valores de StringParameter desde el AWS Systems Manager Parameter Store.
 * Proporciona funciones para listar valores de parámetros clave de tipo string.
 */
export class ArnFunctions {
  // Constantes de los nombres de parámetros para MovieHome ScrollTV
  static readonly ADMIN_LOGIN_FUNCTION_ARN = "/moviehome-scrolltv/admin-login-function-arn";

  /**
   * Recuperar un valor de tipo string desde el Parameter Store.
   * @param scope - El constructo desde el cual se realiza la llamada.
   * @param parameterName - El nombre del parámetro a recuperar.
   * @returns El valor del parámetro como una cadena.
   */
  static getStringParameterValue(
    scope: Construct,
    parameterName: string
  ): string {
    return ssm.StringParameter.valueForStringParameter(scope, parameterName);
  }

  /**
   * Recuperar múltiples valores de parámetros desde el Parameter Store.
   * @param scope - El constructo desde el cual se realiza la llamada.
   * @param parameterNames - Array de nombres de parámetros a recuperar.
   * @returns Objeto con los valores de los parámetros.
   */
  static getMultipleStringParameterValues(
    scope: Construct,
    parameterNames: string[]
  ): { [key: string]: string } {
    const parameters: { [key: string]: string } = {};
    parameterNames.forEach((name) => {
      parameters[name] = ssm.StringParameter.valueForStringParameter(
        scope,
        name
      );
    });
    return parameters;
  }

  /**
   * Obtiene una función Lambda existente usando su ARN almacenado en SSM
   * @param scope - El constructo desde el cual se realiza la llamada.
   * @param parameterName - El nombre del parámetro SSM que contiene el ARN.
   * @param functionId - ID único para la función importada.
   * @returns La función Lambda importada.
   */
  static getLambdaFunctionFromArn(
    scope: Construct,
    parameterName: string,
    functionId: string = "ImportedLambdaFunction"
  ): IFunction {
    const functionArn = ArnFunctions.getStringParameterValue(
      scope,
      parameterName
    );
    return Function.fromFunctionAttributes(scope, functionId, {
      functionArn,
      sameEnvironment: true,
      skipPermissions: true, // Evita intentar otorgar permisos que puedan estar definidos en otro lugar
    });
  }


  
} 