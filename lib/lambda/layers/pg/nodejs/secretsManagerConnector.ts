import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: boolean;
}

// Estructura del secreto tal como viene de AWS RDS
interface RDSSecretConfig {
  username: string;
  password: string;
  engine: string;
  host: string;
  port: number;
  dbname: string;
  dbInstanceIdentifier: string;
}

interface AppConfig {
  database: DatabaseConfig;
  cognito?: {
    userPoolId: string;
    clientId: string;
    region: string;
  };
  environment: string;
}

class SecretsManagerConnector {
  private secretsClient: SecretsManagerClient;
  private config: AppConfig | null = null;
  private secretName: string;

  constructor() {
    this.secretsClient = new SecretsManagerClient({ 
      region: "us-east-1"
    });
    
    // Usar el nombre del secreto específico de tu aplicación
    this.secretName = "/serverless-app/db/secret";
  }

  /**
   * Convierte la configuración de RDS a la estructura que necesita la aplicación
   */
  private convertRDSConfigToAppConfig(rdsConfig: RDSSecretConfig): AppConfig {
    return {
      database: {
        host: rdsConfig.host,
        port: rdsConfig.port,
        database: rdsConfig.dbname,
        user: rdsConfig.username,
        password: rdsConfig.password,
        ssl: true // Por defecto habilitamos SSL para RDS
      },
      environment: process.env.NODE_ENV || "dev"
    };
  }

  /**
   * Obtiene la configuración completa desde Secrets Manager
   */
  async getConfig(): Promise<AppConfig> {
    if (this.config) {
      return this.config;
    }

    try {
      console.log(`Obteniendo configuración desde Secrets Manager: ${this.secretName}`);
      
      const command = new GetSecretValueCommand({
        SecretId: this.secretName,
      });

      const response = await this.secretsClient.send(command);
      
      if (!response.SecretString) {
        throw new Error('No se pudo obtener el secreto desde Secrets Manager');
      }

      const secretData = JSON.parse(response.SecretString);
      
      // Verificar si es la estructura de RDS (tiene username, dbname) o la estructura de la app (tiene database)
      if (secretData.username && secretData.dbname) {
        // Estructura de RDS - convertir
        this.config = this.convertRDSConfigToAppConfig(secretData as RDSSecretConfig);
        console.log('Configuración RDS convertida exitosamente');
      } else if (secretData.database) {
        // Estructura de la app - usar directamente
        this.config = secretData as AppConfig;
        console.log('Configuración de app cargada exitosamente');
      } else {
        throw new Error('Estructura de secreto no reconocida');
      }

      console.log('Configuración cargada exitosamente desde Secrets Manager');
      return this.config;

    } catch (error) {
      console.error('Error obteniendo configuración desde Secrets Manager:', error);
      throw new Error(`No se pudo obtener la configuración: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  /**
   * Obtiene solo la configuración de la base de datos
   */
  async getDatabaseConfig(): Promise<DatabaseConfig> {
    const config = await this.getConfig();
    return config.database;
  }

  /**
   * Obtiene la configuración de Cognito (si existe)
   */
  async getCognitoConfig(): Promise<AppConfig['cognito']> {
    const config = await this.getConfig();
    return config.cognito;
  }

  /**
   * Verifica si una configuración específica existe
   */
  async hasConfig(path: string): Promise<boolean> {
    try {
      const config = await this.getConfig();
      const keys = path.split('.');
      let current: any = config;
      
      for (const key of keys) {
        if (current[key] === undefined) {
          return false;
        }
        current = current[key];
      }
      
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Obtiene un valor específico de la configuración usando dot notation
   */
  async getConfigValue<T>(path: string): Promise<T> {
    const config = await this.getConfig();
    const keys = path.split('.');
    let current: any = config;
    
    for (const key of keys) {
      if (current[key] === undefined) {
        throw new Error(`Configuración no encontrada en el path: ${path}`);
      }
      current = current[key];
    }
    
    return current as T;
  }

  /**
   * Invalida el cache de configuración
   */
  invalidateCache(): void {
    this.config = null;
  }

  /**
   * Health check para verificar conectividad con Secrets Manager
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.getConfig();
      return true;
    } catch (error) {
      console.error('Health check de Secrets Manager falló:', error);
      return false;
    }
  }
}

// Instancia singleton del conector de Secrets Manager
const secretsManagerConnector = new SecretsManagerConnector();

export default secretsManagerConnector; 