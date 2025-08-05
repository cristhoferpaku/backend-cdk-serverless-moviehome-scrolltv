import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import * as crypto from 'crypto';
import { 
  createSuccessResponse, 
  createBadRequestResponse, 
  createInternalServerErrorResponse,
  parseRequestBody
} from '../../../layers/utils/nodejs/utils';

interface BunnyStreamConfig {
  apiKey: string;
}

interface VideoSignatureRequest {
  libraryId: string;
  videoId: string;
}

interface VideoSignatureResponse {
  AuthorizationSignature: string;
  AuthorizationExpire: number;
}

class BunnyStreamSecretsManager {
  private secretsClient: SecretsManagerClient;
  private secretName: string;
  private cachedConfig: BunnyStreamConfig | null = null;

  constructor() {
    this.secretsClient = new SecretsManagerClient({ 
      region: "us-east-1"
    });
    
    // Nombre del secreto para Bunny Stream - ajusta según tu configuración
    this.secretName = "/serverless-app/bunny/secret_id";
  }

  async getBunnyStreamConfig(): Promise<BunnyStreamConfig> {
    if (this.cachedConfig) {
      return this.cachedConfig;
    }

    try {
      const command = new GetSecretValueCommand({
        SecretId: this.secretName,
      });

      const response = await this.secretsClient.send(command);
      
      if (!response.SecretString) {
        throw new Error('No se pudo obtener el secreto de Bunny Stream desde Secrets Manager');
      }

      const secretData = JSON.parse(response.SecretString);
      
      // Verificar que tenga la estructura esperada
      if (!secretData.apiKey && !secretData.VITE_BUNNY_STREAM_API_KEY) {
        throw new Error('API key de Bunny Stream no encontrada en el secreto');
      }

      this.cachedConfig = {
        apiKey: secretData.apiKey || secretData.VITE_BUNNY_STREAM_API_KEY
      };

      return this.cachedConfig;

    } catch (error) {
      throw new Error(`No se pudo obtener la configuración de Bunny Stream: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  async getApiKey(): Promise<string> {
    const config = await this.getBunnyStreamConfig();
    return config.apiKey;
  }
}

const bunnyStreamSecrets = new BunnyStreamSecretsManager();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Parse request body
    const requestBody = parseRequestBody<VideoSignatureRequest>(event.body);
    if (!requestBody) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }
    const { libraryId, videoId } = requestBody;
    // Validate required parameters
    if (!libraryId || !videoId) {
      return createBadRequestResponse(
        'Parámetros requeridos faltantes: libraryId y videoId son obligatorios', 
        event,
        { missingFields: ['libraryId', 'videoId'].filter(field => !requestBody[field as keyof VideoSignatureRequest]) }
      );
    }
    // Get API key from Secrets Manager
    const apiKey = await bunnyStreamSecrets.getApiKey();
    // Calculate expiration time (6 hours from now)
    const expirationTime = Math.floor(Date.now() / 1000) + 3600 * 6;
    // Generate signature data
    const data = libraryId + apiKey + expirationTime + videoId;
    // Create SHA256 signature
    const signature = crypto.createHash('sha256').update(data).digest('hex');

    const responseData: VideoSignatureResponse = {
      AuthorizationSignature: signature,
      AuthorizationExpire: expirationTime
    };
    return createSuccessResponse(
      responseData,
      'Firma de autorización generada exitosamente',
      event
    );

  } catch (error) {
    return createInternalServerErrorResponse(
      'Error interno al generar la firma de video',
      event,
      { 
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    );
  }
};