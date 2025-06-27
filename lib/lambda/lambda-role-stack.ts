import { Stack, StackProps, Tags } from 'aws-cdk-lib';
import { Role, ServicePrincipal, ManagedPolicy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { LambdaRoleConfig } from './roles/lambda-roles'; // Importar configuración de roles desde un archivo externo
import { createPolicies } from './roles/lambda-policies'; // Importar la función para crear políticas

export class LambdaRoleStack extends Stack {
  public readonly roles: { [key: string]: Role };

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Inicializar el objeto roles
    this.roles = {};

    // Crear las políticas configuradas utilizando la función con los valores de región y cuenta
    const policies = createPolicies(this.region, this.account);



    // Crear todos los roles basados en la configuración
     // Crear roles según la configuración especificada
     for (const roleConfig of LambdaRoleConfig) {
      const role = new Role(this, roleConfig.id, {
          assumedBy: new ServicePrincipal(roleConfig.assumedByService),
          managedPolicies: roleConfig.managedPolicies?.map(policyName => ManagedPolicy.fromAwsManagedPolicyName(policyName)),
      });

      // Agregar las políticas personalizadas
      if (roleConfig.policyStatements) {
          for (const policyStatement of roleConfig.policyStatements) {
              role.addToPolicy(policyStatement);
          }
      }

      // Agregar políticas adicionales si existen
      if (roleConfig.additionalPolicies) {
          for (const policyId of roleConfig.additionalPolicies) {
              const policy = policies[policyId];
              if (policy) {
                  role.addToPolicy(policy);
              }
          }
      }

      // Almacenar el rol creado para su reutilización
      this.roles[roleConfig.id] = role;
  }

    // Tags
 //  Tags.of(this).add('Component', 'LambdaRoles');
  }
} 